<template>
  <div class="bk-image-upload">
    <v-card outlined>
      <v-card-text
        class="text-center"
        height="100%"
      >
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
          :style="{ height: height,'min-width': minwidth, 'max-width':maxwidth}"
          :src="newImage || emptyImage"
          @click="$refs.imageUpload.click()"
        />
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import emptyImage from "../../assets/images/upload.jpg";
export default {
  name: "ImageUpload",
  data() {
    return {
      height: "300px",
      width: "100px",
      minwidth: "200px",
      maxwidth: "300px",
      newImage: "",
      newImageRaw: null,
      emptyImage,
    };
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
    <style lang="sass" scoped>
</style>
    
    