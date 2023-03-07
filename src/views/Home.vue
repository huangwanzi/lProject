<template>
  <div class="home">
    <HelloWorld msg="Welcome to App KAK KAK" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  }
})
</script>
