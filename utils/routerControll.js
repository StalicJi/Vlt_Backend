import { getTokenFromLocal } from "~/utils/getToken";
import { useRoute } from "vue-router";

export function checkPath() {
  const route = useRoute();

  const tokenObject = getTokenFromLocal();

  // 判斷是否攥改網址
  if (tokenObject.groupId === "sysUser" && route.fullPath === "/PjChart") {
    window.location.href = "/PjChart/404NotFound";
    // console.log(test_1);
    return;
  }
  if (
    route.params.id !== tokenObject.staffId &&
    !["DepManager", "GeneralManager", "ViceGeneralManager"].includes(
      tokenObject.groupId
    )
  ) {
    window.location.href = "/PjChart/404NotFound";
    // console.log(test_2);
    return;
  }
}
