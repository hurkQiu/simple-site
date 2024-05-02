<template>
  <a-modal :open="open" title="登入" :footer="null" @cancel="closeWindow">
    <a-form :form="form" @submit="loginSubmit">
      <a-form-item
        label="帳號"
        name="username"
        :rules="[
          { required: account.length <= 0, message: '請輸入帳號', trigger: 'blur' },
          {
            required: !/^[a-zA-Z0-9]+$/.test(account),
            message: '請輸入英數字',
            trigger: 'blur'
          }
        ]"
      >
        <a-input v-model:value="account" />
      </a-form-item>
      <a-form-item
        label="密碼"
        name="password"
        :rules="[
          { required: password.length <= 0, message: '請輸入密碼', trigger: 'blur' },
          { required: !/^[a-zA-Z0-9]+$/.test(password), message: '請輸入英數字', trigger: 'blur' }
        ]"
      >
        <a-input type="password" v-model:value="password" />
      </a-form-item>
      <div style="color: #ff0000" v-show="errorMessage !== ''">
        {{ errorMessage }}
      </div>
      <div style="display: flex; width: 100%; justify-content: center; gap: 20px">
        <a-button type="primary" html-type="submit" @click="loginSubmit">登入</a-button>
        <a-button type="primary" html-type="submit" @click="registerSubmit">註冊</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Modal, Form, Input, Button } from 'ant-design-vue'
import { API } from '@/axios/api'
import type { UserReq } from '@/axios/Model/CommonModel'
import { StoreCommit, store } from '@/stores'

export default {
  props: ['open'],
  components: {
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-button': Button
  },
  setup() {
    const form = ref(null)
    const account = ref('')
    const password = ref('')
    const errorMessage = ref('')
    return {
      form,
      account,
      password,
      errorMessage
    }
  },
  methods: {
    closeWindow() {
      store.state.routeModule.isLogin = false
    },
    async loginSubmit() {
      const user: UserReq = { account: this.account, password: this.password }
      const res = await API.getInstance().login(user)
      if (res.status === 200) {
        this.errorMessage = ''
        store.commit(StoreCommit.SET_USER, res.data)
        store.commit(StoreCommit.SET_NOTIFY, {
          isNotify: true,
          title: 'message',
          message: 'login successful'
        })
        localStorage.setItem('token', res.data.token)
        this.closeWindow()
      } else {
        this.errorMessage = res.data
      }
    },
    async registerSubmit() {
      const user: UserReq = { account: this.account, password: this.password }
      const res = await API.getInstance().registerUser(user)
      if (res.status === 200) {
        this.errorMessage = ''
        this.loginSubmit()
      } else {
        this.errorMessage = res.data
      }
    }
  }
}
</script>
