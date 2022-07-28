<template>
    <div>
        <div id="guide" style="margin-bottom:100px">
      <el-row style="margin-top: 10px; float: right">
        工程认证达成度定型化管理系统
        <el-button @click="home" style="margin-left: 720px" type="danger" plain>
          首页
        </el-button>
        <el-button @click="data" type="primary" plain>数据管理</el-button>
        <el-button @click="classManage" type="success" plain
          >班级管理</el-button
        >
        <el-button @click="user" type="info" plain>个人信息</el-button>
        <el-button
          @click="about"
          style="margin-right: 10px"
          type="primary"
          plain
          >关于我们</el-button
        >
      </el-row>
    </div>
    <div style="margin-bottom:100px">
        <avue-data-rotate :option="option"></avue-data-rotate>
        
       </div> 
    <avue-data-display :option="option1"></avue-data-display>
    </div>
    
</template>

<script>
export default {
    data(){
    return {
        option: {
          span: 8,
          data: [
            {
              click: function (item) {
                window.location.replace("/#/yearMajorClass");
              },
              count: '基础信息设置',
              title: '设置学校共有多少年级,每个年级有专业,以及专业对应的班级',
              icon: 'el-icon-menu',
              color: '	#00CD66'
            }, {
              click: function (item) {
                window.location.replace("/#/graduateDemands");
              },
              count: '毕业要求设置',
              title: '对专业的毕业要求进行新增修改删除等操作',
              icon: 'el-icon-document',
              color: '	#7B68EE'
            }, {
               click: function (item) {
                window.location.replace("/#/supportEstate");
              },
              count: '支撑等级设置',
              title: '设置达成等级数、支撑等级数及评分等级数、师生评分比例',
              icon: 'el-icon-setting',
              color: '#f39c12'
            },
             {
               click: function (item) {
                window.location.replace("/#/point");
              },
              count: '指标点设置',
              title: '对毕业要求对应的指标点内容进行新增修改删除等操作',
              icon: 'el-icon-s-management',
              color: '	#FF6A6A'
            }, {
              click: function (item) {
                window.location.replace("/#/trainingPlan");
              },
              count: '培养计划设置',
              title: '对培养计划中的课程信息进行新增修改删除等操作',
              icon: 'el-icon-warning',
              color: '#00a65a'
            }, {
              click: function (item) {
                window.location.replace("/#/assign");
              },
              count: '分配指标点',
              title: '给指标点分配课程和支撑等级',
              icon: 'el-icon-location-outline',
              color: '#363636'
            }
          ]
        },
         option1: {
        span:6,
        data: [
        {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            count: '16',
            decimals:2,
            title: '日活跃数',
            //href:'https://avuejs.com',
            //target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            count: '210',
            title: '月活跃数',
            //href:'https://avuejs.com',
            //target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            count: '1500',
            title: '年活跃数',
            //href:'https://avuejs.com',
           // target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            count: '30',
            title: '周活跃数',
            //href:'https://avuejs.com',
            //target:'_blank'
          }
        ]
      },
      }
  },
   methods:{
    data(){
      window.location.reload()
    },
    home(){
      this.$router.push('/home');
    },
    user(){
      this.$router.push('/user');
    },
    about(){
      this.$router.push('/about');
    },
    classManage(){
      this.$router.push('/class');
    }
  }
}
</script>

<style lang="less" scoped>
#guide {
  height: 60px;
  background-color: #f5f5f8;
  color: #333;
  text-align: center;
  line-height: 40px;
}
</style>