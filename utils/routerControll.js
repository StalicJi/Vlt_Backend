import { getTokenFromLocal } from "~/utils/getToken";
import { useRoute } from "vue-router";

export function checkPath() {
  const route = useRoute();
  //   console.log(route);
  const tokenObject = getTokenFromLocal();

  if (tokenObject.groupId === "sysUser" && route.fullPath === "/") {
    window.location.href = "/404NotFound";
    // console.log(test_1);
    return;
  }
  if (
    route.params.id !== tokenObject.staffId &&
    !["DepManager", "GeneralManager", "ViceGeneralManager"].includes(
      tokenObject.groupId
    )
  ) {
    window.location.href = "/404NotFound";
    // console.log(test_2);
    return;
  }
}
