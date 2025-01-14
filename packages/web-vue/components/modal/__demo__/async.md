```yaml
title:
  zh-CN: 异步关闭
  en-US: Async Close
```

## zh-CN

可以通过 on-before-ok 更简洁的实现异步关闭功能

---

## en-US

$END$

---

```vue
<template>
  <a-button @click="handleClick">Open Modal</a-button>
  <a-modal v-model:visible="visible" @cancel="handleCancel" @before-ok="handleBeforeOk" unmountOnClose>
    <template #title>
      Title
    </template>
    <div>You can cusstomize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false)

const handleClick = () => {
  visible.value = true;
}

const handleBeforeOk = (done) => {
  window.setTimeout(() => {
    done()
  }, 3000)
}

const handleCancel = () => {
  visible.value = false;
}
</script>
```
