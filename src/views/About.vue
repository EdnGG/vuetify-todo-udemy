<template>
  <div class="about pa-6">
    <h1>About {{ $store.state.appTitle || 'Vuetify Todo' }}</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem natus eveniet quo? Harum iure temporibus explicabo, porro illum animi, voluptate impedit eveniet recusandae adipisci nostrum excepturi nesciunt modi suscipit. Doloribus!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae impedit maxime cumque voluptas, iusto facilis corporis eum officia illo, perferendis officiis! Non earum odit ullam tenetur labore delectus ad voluptas.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum suscipit quas facilis cupiditate fugiat perspiciatis voluptatem eum commodi voluptatum temporibus! Nihil aut aliquam dolores molestias odio minus reprehenderit hic suscipit?
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    // appTitle() {
    //   return process.env.VUE_APP_TITLE
    // }
  }
}
</script>

