import { getTokenFromLocal } from "~/utils/getToken";
import { useRoute } from "vue-router";

export function checkPath() {
  const route = useRoute();
  const tokenObject = getTokenFromLocal();
  //   console.log(tokenObject.staffId);

  //   if (tokenObject.groupId === "sysUser" && route.fullPath === "/") {
  //     window.location.href = "/404NotFound";
  //   }
  if (route.params.id !== tokenObject.staffId) {
    window.location.href = "/404NotFound";
  }
}
