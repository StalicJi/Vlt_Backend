<template>
  <div
    class="border w-full h-28 bg-[#126992] rounded-md drop-shadow-lg py-2 px-4"
  >
    <div class="flex-btw px-2">
      <p class="text-white">專案選擇器</p>
      <Button buttonText="查詢" />
    </div>
    <div class="mt-2 px-2">
      <VaSelect
        v-model="valueSingle"
        :options="options"
        searchable
        highlight-matched-text
        background="#fff"
        class="w-full"
        color="info"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Button from "../components/element/Button.vue";
export default {
  components: {
    Button,
  },
  name: "Searchable",

  data() {
    
    return {
      options: [
 
      ],
      valueSingle: "",
    };
  },

  beforeMount (){ 
  // $.ajax({
  //       type: "post",
  //       url: "https://localhost:7500/ProjectAnalysis/ProjectSelector",
  //       data: JSON.stringify({"id": "All"}),
  //       contentType: "application/json",
      
  //       success: function (response) {
  //   console.log(response["projectNames"])
  //       this.options=response["projectNames"]
        
  // }
  //   });




//POST請求
axios.post("https://localhost:7500/ProjectAnalysis/ProjectSelector",{
  
 "id": "All",
})
    .then( (response) =>{this.options=response.data.projectNames;this.valueSingle=response.data.projectNames[0]}
    
    )
    .catch( (error) => console.log("11"))

  },
};
</script>
