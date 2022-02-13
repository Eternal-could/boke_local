<template>
  <div class="container">
    <h1 class="headline">Page Not Found</h1>
    <a href="/" class="b9 show">回到主页</a>
  </div>
</template>

<script>
export default {
  name: "Page404"
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url(../assets/img/background.jpg);
  background-attachment: fixed;
}
.headline {
  font-size: 2.4rem;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  color: #f2f2f2;
  text-align: center;
  margin-bottom: 0px;
  margin-top: 240px;
}
.b9 {
  padding: 0 28px;
  height: 54px;
  white-space: nowrap;
  text-transform: uppercase;
  border: 1px solid #ab89d8;
  color: #f2f2f2;
  background: transparent;
  font-size: 11.115px;
  letter-spacing: 1.3px;
  text-align: center;
  display: flex;
  width: 175px;
  height: 54px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  padding: 0px;
  margin-top: 36px;
}
a {
  color: #f2f2f2;
  font-weight: bold;
  text-decoration: none;
}
</style>