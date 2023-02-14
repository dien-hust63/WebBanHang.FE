<template>
  <div class="bk-image-upload">
    <input
      style="display:none"
      type="file"
      @change="onFileSelected"
      ref="imageUpload"
      accept="image/*"
    >
    <img
      class="bk-image-upload-icon"
      alt="Ảnh hàng hóa"
      :style="{ 'width': width}"
      :src="newImage || emptyImage"
      @click="$refs.imageUpload.click()"
    />
  </div>
</template>
<script>
import emptyImage from "../../assets/images/upload.jpg";
export default {
  name: "ImageUpload",
  data() {
    return {
      newImage: "",
      newImageRaw: null,
      emptyImage,
    };
  },
  props: {
    height: String,
    width: String,
    minwidth: String,
    maxwidth: String,
  },
  created() {},
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0];
      this.newImageRaw = file;
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        this.newImage = await theReader.result;
      };
      theReader.readAsDataURL(file);
    },
  },
};
</script>
<style  scoped>
.bk-image-upload {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
    
    