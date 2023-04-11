<script>
import { startSakura, stopp } from "./source/sakura.js";
export default {
  mounted() {
    startSakura();
  },
  unmounted() {
    stopp();
  }
};
</script>
