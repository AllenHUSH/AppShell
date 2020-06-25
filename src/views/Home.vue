<template>
  <div class="home">
    <hello-world />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld";

export default {
  name: "Home",
  components: { HelloWorld }
};
</script>
