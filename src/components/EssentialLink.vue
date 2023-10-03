<template>
  <div >
    <q-item
    clickable
    :to="route"
    exact
    class="my-font"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-separator inset class="q-ma-sm"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    route: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>

<style>

.my-font {
  font-family: 'unineue';
}
</style>
