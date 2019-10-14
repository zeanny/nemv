<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-row justify="center">
      <v-col cols="12">
        <div>[구두점복원 테스트]</div>  
        <v-text-field
          v-model="message"
          :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"            
          filled
          clear-icon="mdi-close-circle"
          clearable
          label="TEXT="
          type="text"
          @focus="clearMessage"
          @click:append-outer="sendMessage"
          @click:clear="clearMessage"
          v-on:keyup.enter="sendMessage"
        ></v-text-field>      
        <v-card
          class="mx-auto" 
          flat         
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>RECOVERED_TEXT : {{ result_newAPI }}</v-list-item-title>
              <v-list-item-subtitle>IS_SUCCESSFUL : {{ result_is_successful }}</v-list-item-subtitle>
              <v-list-item-subtitle>MSG : {{ result_msg }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{ result_oldAPI }}</v-list-item-title>
              <v-list-item-subtitle>ETRI 구두점복원 API</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        
      </v-col>
      <v-col
        cols="12"
      >
        <material-card class="v-offset"
        >
          <v-list-item-title  class="overline mb-2">구두점복원 API 테스트 히스토리            
          </v-list-item-title>
            
          <v-data-table
            :headers="headers"
            :items="api_history"
            :dense=true
          >
          </v-data-table>
        </material-card>
      </v-col>

      <v-col
        cols="12"
      >
        <material-card
          color="orange"
          title="http://172.30.6.192:5000/API/autopunc"
          text="REST(POST) API call"
        >
          <v-list-item-title  class="overline mb-1">request(application/json)</v-list-item-title>
          <v-data-table
            :headers="api_headers"
            :items="api_request"
            :dense=true
            hide-default-footer
          />
          <br>
          <v-list-item-title  class="overline mb-1">response(application/json)</v-list-item-title>
          <v-data-table
            :headers="api_headers"
            :items="api_response"
            :dense=true
            hide-default-footer
          />
        </material-card>
      </v-col>

      <v-col cols="12">
        <div>[feedback]</div> 
        <div class="overline mb-1">JIRA : <a href="https://jira.hancom.com:8443/browse/EXOBRAIN-76" target="_blank">문제점 발견 시</a></div>
        <div class="overline mb-2">confluence : <a href="https://wiki.hancom.com:8443/pages/viewpage.action?pageId=28950865" target="_blank">개선점 발견 시</a></div>  
        많은 의견 부탁드립니다.
      </v-col>

    </v-row>

  </v-container>
  
</template>

<style scoped>

</style>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      message:'구두점 복원 문자열을 입력하세요',
      
      result_oldAPI:"구두점 복원된 문장이 출력됩니다. ",
      result_newAPI:"구두점 복원된 문장이 출력됩니다. ",
      result_msg : "",
      result_is_successful : "true/false",

      headers: [
        {
          text: "API",
          align: "left",
          sortable: false,
          value: "api"
        },
        {
          text: "출력데이터",
          align: "left",
          sortable: false,
          value: "text"
        },
        {
          text: "입력데이터",
          align: "left",
          sortable: false,
          value: "input"
        },
        {
          text: "처리시간(sec)",
          align: "left",
          sortable: false,
          value: "time"
        }
      ],
      api_history: [],

      api_headers: [
        {
          text: "key",
          align: "left",
          sortable: false,
          value: "key"
        }, 
        {
          text: "데이터 타입",
          align: "left",
          sortable: false,
          value: "type"
        }, 
        {
          text: "설명",
          align: "left",
          sortable: false,
          value: "discription"
        }, 
        {
          text: "비고",
          align: "left",
          sortable: false,
          value: "etc"
        }
      ],
      api_request:[
        {
          key:"TEXT",
          type:"string",
          discription:"부호 복원할 문장",
          etc:"길이 제한 없음"          
        }
      ],

      api_response: [
        {
          key:"IS_SUCCESSFUL",
          type:"bool",
          discription:"결과 bool값",
          etc:"true | false"          
        },
        {
          key:"MSG",
          type:"string",
          discription:"결과 메세지",
          etc:""                    
        },
        {
          key:"RECOVERED_TEXT",
          type:"string",
          discription:"부호 복원된 문장",
          etc:""          
        }
      ],

    }),
    mounted () {
      this.checklist()

      // Decimal round
      if (!Math.round10) {
        Math.round10 = function(value, exp) {
          // If the exp is undefined or zero...
          if (typeof exp === 'undefined' || +exp === 0) {
            return Math['round'](value);
          }
          value = +value;
          exp = +exp;
          // If the value is not a number or the exp is not an integer...
          if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
          }
          // Shift
          value = value.toString().split('e');
          value = Math['round'](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
          // Shift back
          value = value.toString().split('e');
          return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
        };
      }
    },
    methods: {

      checklist () {
        let query = '{ "test" : false }'
        axios.get('http://172.30.6.192:3000/API/autopunc/history/'+query)
        .then( response => {          
          this.api_history = response.data.api_history

          for ( var log in this.api_history ) {
            if ( this.api_history[log].api == 0 ) {
              this.api_history[log].api = "ETRI"
            } else if ( this.api_history[log].api == 1 ) {
              this.api_history[log].api = "BERT"
            }

            this.api_history[log].ouput
            if ( this.api_history[log].succeed == true ) {
              this.api_history[log].succeed = "O"
              this.api_history[log].text = this.api_history[log].output
            } else if ( this.api_history[log].succeed == false ) {
              this.api_history[log].succeed = "X"

              this.api_history[log].text = this.api_history[log].output + "<=" + this.api_history[log].input
            }

            this.api_history[log].time = Math.round10(this.api_history[log].time, -3)
          }
        })
        .catch((e) => {
          console.log('error', e.message)
        });
      },

      clearMessage () {
        if (this.message=='구두점 복원 문자열을 입력하세요')
          this.message="",
        this.result_oldAPI="구두점 복원된 문장이 출력됩니다. ",
        this.result_newAPI="구두점 복원된 문장이 출력됩니다. " 
      },

      waitingMessage () {
        this.result_newAPI="서버 응답을 기다리고 있습니다.",
        this.result_oldAPI="서버 응답을 기다리고 있습니다."
      },

      callAPI () { // curl -X POST "http://172.30.6.192:5000/API/test_autopunc" -H "Content-type:application/json" -d '{"TEXT":"안녕하세요"}'
        let data = {
          "TEXT": this.message,
          "LANG" : "ko"
        }
        axios.post('http://172.30.6.192:5000/API/test_autopunc', data, {
          headers : {
            'Content-type': 'application/json'
          }
        })
        .then( response => {
          this.result_newAPI=response.data["RECOVERED_TEXT"]
          this.result_oldAPI=response.data["RECOVERED_TEXT_OLD"]
          this.result_msg=response.data["MSG"]
          if (response.data["IS_SUCCESSFUL"]) 
            this.result_is_successful="true"
          else
            this.result_is_successful="false"

          this.checklist()
        })
        .catch((e) => {
          console.log('error', e.message)
        })
      },
      
      sendMessage () {
        if (this.message != "") {
          this.waitingMessage()

          this.callAPI()
        }
      }
    }
  }
</script>
