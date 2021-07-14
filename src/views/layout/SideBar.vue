<template>
  <v-navigation-drawer
    v-model="primaryDrawer.model"
    :clipped="primaryDrawer.clipped"
    :floating="primaryDrawer.floating"
    :mini-variant="primaryDrawer.mini"
    :permanent="primaryDrawer.type === 'permanent'"
    :temporary="primaryDrawer.type === 'temporary'"
    app
    overflow
  >
    <v-list nav dense>
      <v-list-item-group color="text--teal text--lighten-3">
        <!-- active-class="deep-purple--text text--accent-4" -->
        <v-list-item v-for="(link, index) in sidebarLinks" :key="link.name + index" :to="link.path">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ link.name }}</v-list-item-title>
        </v-list-item>

        <v-list-item href="/monitor" target="_blank">
          <v-list-item-icon>
            <v-icon>mdi-monitor-screenshot</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Monitor</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    primaryDrawer: {
      type: Object,
    },
  },
  data: () => ({
    sidebarLinks: [
      {
        name: 'Painel',
        icon: 'mdi-ballot-outline',
        path: '/dashboard',
      },
      // {
      //   name: 'Monitor',
      //   icon: 'mdi-monitor-screenshot',
      //   path: '/monitor',
      // },
    ],
  }),
};
</script>

<style scoped>
</style>
