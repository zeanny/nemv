<template>
  <v-container
    fluid
    grid-list-xl>
    <v-row  justify="center">
      <!-- <v-card>
        <v-tabs
          dark
          background-color="indigo"
        >

          <v-tab
            v-for="item in api_version"
            :key="item"
          >
          {{ item.text }}
          </v-tab>
        </v-tabs>
      </v-card> -->
        <v-tabs
          v-model="version"
          background-color="transparent"
          color="indigo"
          @change="ch_version"
          >
          <v-tab
            v-for="item in api_version"
            :key="item"
          >
            {{ item.text }}
          </v-tab>
        </v-tabs>

        <!-- <v-tabs-items 
          continuous=true
          v-model="version">
          <v-tab-item
            v-for="item in api_version"
            :key="item"
          >
            {{ item.discription }}
          </v-tab-item>
        </v-tabs-items> -->

      <v-col cols="12">
        <div v-if="status">
          <small>
            <div v-for="version in api_version" :key="version">
              {{ version.text }} : {{ version.discription }}
            </div>
          </small>
            <br>

          <h4>
            aihub 구어체 문장, gienietalk 로그 문장 중 랜덤으로 30% 선택하여 테스트를 실시 하였습니다.
          </h4>
          <small>
            exo-bert, ETRI 구두점복원 API 동일한 서버 환경하에 설치하여, 테스트를 실행
            <br>
            exo-bert : python + pytorch + korBERT + gpu
            <br>
            ETRI : pythoh + C++ dinamic library 
            <br>
            <br>
          </small>
          <h5>exo-bert 구두점복원 성공률 :: 
            {{status.api_succeed_percent}}% ({{status.api_total_time}},  {{status.api_mean_time}} per one process )</h5>
          <small>총 {{status.api_total_count}}개의 문장을 테스트 진행 
            {{status.api_succeed_count}}개의 문장을 복원 성공하였습니다.</small>
          <h5>ETRI 구두점복원 API 성공률 :: 
            {{status.trans_succeed_percent}}% ({{status.trans_total_time}},  {{status.trans_mean_time}} per one process )</h5>
          <small>총 {{status.trans_total_count}}개의 문장을 테스트 진행 
            {{status.trans_succeed_count}}개의 문장을 복원 성공하였습니다.</small>
        </div>  
      </v-col>
      
      <v-col
        cols="12"
      >
        <material-card class="v-offset"
        >
          <div align="right">
            <!-- <span width="400">
              <v-file-input show-size label="File input" 
              append-outer-icon="mdi-upload" 
              @click:append-outer="testAutopunc"
              v-on:change="upload($event.target.name, $event.target.files)"
            ></v-file-input>
            </span> 
            <v-icon @click="checkStatus" title="로그 상태를 다시 읽어읽습니다.">mdi-cached</v-icon>
            <v-icon @click="deleteLog" title="테스트를 통해 생성된 로그를 삭제합니다">mdi-delete</v-icon>
            -->

            <!-- <v-icon @click="checklist" title="로그 상태를 다시 읽어읽습니다.">mdi-cached</v-icon> -->
          </div>
          <v-list-item-title  class="overline mb-2">구두점복원 API 테스트 히스토리            
           
          </v-list-item-title>
             <!-- <v-text-field
              v-model="query_api"
              label="query"
              single-line
              clearable
              
              :append-outer-icon="query_api ? 'mdi-send' : 'mdi-microphone'"  
              class="mx-5"
            ></v-text-field> -->
            <v-text-field
              v-model="search_api"
              label="Search"
              single-line
              
              class="mx-4"
              cols="6"
            ></v-text-field>
          <v-data-table
            :headers="headers"
            :items="api_history"
            :dense=true
            :search="search_api"
          >
          </v-data-table>
        </material-card>
      </v-col>
      <v-col cols="12">
        <div>
          <h4>
            2019/09/26 : aihub 구어체 문장, gienietalk 로그 문장 중 랜덤으로 30% 선택하여 일부에 대해 테스트를 실시 하였습니다. 
          </h4>
          <h5>exo-bert 구두점복원 성공률 :: 72.04% </h5>
          <small>총 7830개의 문장을 테스트 진행 5641개의 문장을 복원 성공하였습니다.</small>
          <h5>ETRI 구두점복원 API 성공률 :: 56.58%</h5>
          <small>총 7829개의 문장을 테스트 진행 4430개의 문장을 복원 성공하였습니다.</small>
          <br>
          <br>
          <h4>
            2019/10/02 : padding 수정 (version:2)
          </h4>
          <h5>exo-bert 구두점복원 성공률 :: 76% (12분8초461) </h5>
          <small>총 14381개의 문장을 테스트 진행 11008개의 문장을 복원 성공하였습니다.</small>
          <h5>ETRI 구두점복원 API 성공률 :: 57% (5초277)</h5>
          <small>총 14381개의 문장을 테스트 진행 8261개의 문장을 복원 성공하였습니다.</small>
          <br>
          <br>
          <br>
        </div>  
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        //autopunc: {
        status: {},
        api_history: [],
        api_version: [
          {
            text : "version 1",
            discription : "korBERT"
          },
          {
            text : "version 2",
            discription : "korBERT + PAD 수정버전"
          },
          {
            text : "version 3",
            discription : "korBERT + PAD 수정버전 + 국립어학원 데이터 학습"
          }
        ], 
        version: 0 // db에서 정보를 읽기 위한 version으로 exo_bert.py의 api_version을 참고 한다.
        //}
        ,
        search_api: '',
        query_api:'',

        headers: [
          {
            text: "성공유무",
            align: "left",
            sortable: false,
            value: "succeed"
          }, 
          {
            text: "API",
            align: "left",
            sortable: false,
            value: "api"
          },
          {
            text: "분류(test filename)",
            align: "left",
            sortable: false,
            value: "category"
          },
          {
            text: "출력데이터",
            align: "left",
            sortable: false,
            value: "output"
          },
          {
            text: "처리시간(sec)",
            align: "left",
            sortable: false,
            value: "time"
          }
        ],   
      }
    },
    updated () {
      console.log("updated") 
    
    
    },
    mounted () {
      this.checkStatus()
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
      getTimeReadable(t_time) {
        var minute = parseInt(t_time/60)
        t_time -= minute*60
        var second = parseInt(t_time)
        t_time -= second
        var mod = t_time
        var strTime = ""
        if (minute > 0) {
          strTime += minute + "분"
        } 
        if (second > 0) {
          strTime += second + "초"
          strTime += parseInt(mod*1000)
        } else {
          strTime += st_time
        }
        return strTime
      },

      ch_version(ver) {
        this.status = {}
        this.api_history = []
        this.version = ver

        this.checkStatus()
        this.checklist()
      },

      checkStatus () {
        console.log("checkStatus");
        
        axios.get('http://172.30.6.192:3000/API/autopunc/status?version='+parseInt(this.version+1))
        .then( response => {          
          this.status = response.data.status
          this.status.api_succeed_percent = Math.round10((this.status.api_succeed_count*100/this.status.api_total_count), -2)
          this.status.trans_succeed_percent = Math.round10((this.status.trans_succeed_count*100/this.status.trans_total_count), -2)

          this.status.api_mean_time = Math.round10(this.status.api_total_time/this.status.api_total_count, -4)
          this.status.trans_mean_time = Math.round10(this.status.trans_total_time/this.status.trans_total_count, -4)

          this.status.api_total_time = this.getTimeReadable(this.status.api_total_time)
          this.status.trans_total_time = this.getTimeReadable(this.status.trans_total_time)
                       
          console.log(this.status) 
        })
        .catch((e) => {
          console.log('error', e.message)
        });
      },

      checklist () {
        console.log("checklist");
        let query = '{ "test" : true, "version" : '+parseInt(this.version+1)+' }'
        console.log(query)
        axios.get('http://172.30.6.192:3000/API/autopunc/history/'+query)
        .then( response => {          
          this.api_history = response.data.api_history
          console.log(this.api_history) 

          for ( var log in this.api_history ) {
            if ( this.api_history[log].api == 0 ) {
              this.api_history[log].api = "E"
            } else if ( this.api_history[log].api == 1 ) {
              this.api_history[log].api = "B"
            }

            this.api_history[log].ouput
            if ( this.api_history[log].succeed == true ) {
              this.api_history[log].succeed = "O"
              this.api_history[log].text = this.api_history[log].output
            } else if ( this.api_history[log].succeed == false ) {
              this.api_history[log].succeed = "X"

              //this.api_history[log].text = this.api_history[log].output + " <= " + this.api_history[log].input
            }

            this.api_history[log].time = Math.round10(this.api_history[log].time, -3)
           
          }
        })
        .catch((e) => {
          console.log('error', e.message)
        });
      },

      upload(name, files) {
        const formData = new FormData();
        formData.append(name, files[0], files[0].name);
        console.log(files[0])
        console.log(files[0].name)
        const url = "http://127.0.0.1:12010/upload/1";
        axios.post(url, formData).then(response => {
          console.log(response);
        })
      },

      handleFileUpload () {
        console.log("test upload")
        this.file = this.$refs.file;
        console.log(this.file)
      },

      testAutopunc () {
        console.log("test Autopunc")

      },

      async deleteLog () {
        console.log("delete log")

        await axios.delete('http://172.30.6.192:3000/API/check_autopunc')
        .then( response => {
          console.log(response.data)
        })
        .catch( e => {
          console.error(e.message)
        });
      },
    }
  }
</script>
