<template>
  <ul class="sidenav app-sidenav" v-bind:class="{open: value}">
    <router-link v-for="link in links" :key="link.url" active-class="active" tag="li" v-bind:to="link.url"
    :exact="link.exact">
      <a class="waves-effect waves-orange pointer" href="#">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  data: () => ({
    links: [
      {title: "Счет", url: "/", exact: true},
      {title: "История", url: "/history"},
      {title: "Планирование", url: "/planning"},
      {title: "Новая запись", url: "/record"},
      {title: "Категория", url: "/categories"}
    ]
  }),
  props: ["value"]
}
</script>

