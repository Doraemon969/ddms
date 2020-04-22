<script src="https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js">
</script>

<template>
<div class="device-wrapper">
        <div class="box">
            <div class="left-list">
                <el-row class="tac">
                    <el-col :span="20">
                        <h5 class="page-title">多多设备租赁后台</h5>
                        <el-menu
                            default-active="0"
                            active-text-color="#f60"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            background-color="#545c64"
                            text-color="#fff"
                            v-for="(item, index) in deviceCategory"
                            v-bind:key="index"
                        >
                            <div class="menuList">
                                <el-submenu index="index">
                                    <template slot="title">
                                        <span>{{item.type}}</span>
                                    </template>
                                    <el-menu-item-group>
                                        <div
                                            v-for="(subItem, subindex) in item.subDevice"
                                            v-bind:key="subindex"
                                            @click="menuClick"
                                        >
                                            <el-menu-item
                                                v-on:click="subClick(index, subindex)"
                                            >{{subItem.name}}</el-menu-item>
                                        </div>
                                    </el-menu-item-group>
                                </el-submenu>
                            </div>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            <div class="right-content">
                <div class="search">
                    <div class="search-input">
                        <el-autocomplete
                            class="input"
                            size="large"
                            v-model="searcInfo"
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请输入要搜索的内容"
                            @select="handleSelect"
                            @keyup.enter.native="searchSubmit"
                        ></el-autocomplete>
                        <el-button v-on:click="searchSubmit" style="margin-left:10px;">搜索</el-button>
                    </div>
                    <div class="add-btn">
                        <el-button
                            type="primary"
                            @click="dialogFormVisible = true"
                            v-on:click="addUserInfo"
                        >添加</el-button>
                    </div>
                </div>
                <div class="device-detail">
                    <div class="editor">
                        <el-row>
                            <el-button v-on:click="deleteUserInfo">删除</el-button>
                            <el-button
                                @click="modifyDialogFormVisible = true"
                                v-on:click="modifyUserInfo"
                            >修改</el-button>
                        </el-row>
                    </div>
                    <div class="detial-content">
                        <ul class="left">
                            <ul style="list-style:none;">
                                <li>
                                    <label>设备名称：</label>
                                    <p>{{ searchMsg.name || deviceCategory[index].subDevice[subIndex].name }}</p>
                                </li>
                                <li>
                                    <label>设备描述：</label>
                                    <p>{{ searchMsg.des || deviceCategory[index].subDevice[subIndex].des }}</p>
                                </li>
                                <li>
                                    <label>日租金：</label>
                                    <p>{{ searchMsg.price || deviceCategory[index].subDevice[subIndex].price }}</p>
                                </li>
                                <li
                                    v-if=" (searchMsg.status == '0') || (deviceCategory[index].subDevice[subIndex].status === '0')"
                                >
                                    <label>使用状态：</label>
                                    <p>设备处于空闲状态</p>
                                </li>
                                <li
                                    v-else-if="(searchMsg.status == '1') || deviceCategory[index].subDevice[subIndex].status === '1'"
                                >
                                    <label>使用状态：</label>
                                    <p>用户使用中</p>
                                </li>
                                <li style="margin-top:40px;font-weight:bold;">
                                    <label>租客信息</label>
                                </li>
                                <div
                                    v-if="(searchMsg.status === '1') || deviceCategory[index].subDevice[subIndex].status === '1'"
                                >
                                    <li>
                                        <label>昵称：</label>
                                        <p>{{ deviceCategory[index].subDevice[subIndex].usedInfo.userNickName }}</p>
                                    </li>
                                    <li>
                                        <label>姓名：</label>
                                        <p>{{ deviceCategory[index].subDevice[subIndex].usedInfo.userName }}</p>
                                    </li>
                                    <li>
                                        <label>手机号码：</label>
                                        <p>{{ deviceCategory[index].subDevice[subIndex].usedInfo.userPhone }}</p>
                                    </li>
                                    <li>
                                        <label>使用期限：</label>
                                        <p>{{ deviceCategory[index].subDevice[subIndex].usedInfo.useTimeStart}} ~ {{ deviceCategory[index].subDevice[subIndex].usedInfo.useTimeEnd}}</p>
                                    </li>
                                </div>
                            </ul>
                        </ul>
                        <div class="right-map">
                            <div class="map">
                                <div id="container" style="width:100%;height:100%;">地图占位</div>
                            </div>
                            <p class="local">设备所在位置</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 添加设备信息 -->
        <el-dialog title="增加设备信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="类型选择" :label-width="formLabelWidth" style="text-align: left;">
                    <el-select v-model="form.type" placeholder="请选择设备类型">
                        <el-option label="流行" value="popular"></el-option>
                        <el-option label="高空作业" value="workHigh"></el-option>
                        <el-option label="土方设备" value="earthmovingEquipment"></el-option>
                        <el-option label="叉车" value="forkliftTruck"></el-option>
                        <el-option label="气动工具" value="pneumaticTools"></el-option>
                        <el-option label="物料搬运" value="truck"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备描述" :label-width="formLabelWidth">
                    <el-input v-model="form.des" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备经度" :label-width="formLabelWidth">
                    <el-input v-model="form.local.longtitue" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备纬度" :label-width="formLabelWidth">
                    <el-input v-model="form.local.latitue" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="设备状态选择"
                    :label-width="formLabelWidth"
                    style="text-align: left;"
                >
                    <el-select v-model="form.status" placeholder="请选择设备状态">
                        <el-option label="使用中" value="1"></el-option>
                        <el-option label="空闲中" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户微信昵称" :label-width="formLabelWidth">
                    <el-input v-model="form.usedInfo.userNickName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户手机" :label-width="formLabelWidth">
                    <el-input v-model="form.usedInfo.userPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户使用设备开始时间" :label-width="formLabelWidth">
                    <el-input v-model="form.usedInfo.useTimeStart" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户使用设备结束时间" :label-width="formLabelWidth">
                    <el-input v-model="form.usedInfo.useTimeEnd" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="dialogFormVisible = false"
                    v-on:click="addInfoSubmmit()"
                >确 定</el-button>
            </div>
        </el-dialog>

        <!-- 修改设备信息 -->
        <el-dialog title="修改设备信息" :visible.sync="modifyDialogFormVisible">
            <el-form :model="modifyForm">
                <el-form-item label="类型选择" :label-width="formLabelWidth" style="text-align: left;">
                    <el-select v-model="modifyForm.type">
                        <el-option label="流行" value="popular"></el-option>
                        <el-option label="高空作业" value="workHigh"></el-option>
                        <el-option label="土方设备" value="earthmovingEquipment"></el-option>
                        <el-option label="叉车" value="forkliftTruck"></el-option>
                        <el-option label="气动工具" value="pneumaticTools"></el-option>
                        <el-option label="物料搬运" value="truck"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备名称" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备描述" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.des" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备经度" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.local.longtitue" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备纬度" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.local.latitue" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="设备状态选择"
                    :label-width="formLabelWidth"
                    style="text-align: left;"
                >
                    <el-select v-model="modifyForm.status" placeholder="请选择设备状态">
                        <el-option label="使用中" value="1"></el-option>
                        <el-option label="空闲中" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户微信昵称" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.usedInfo.userNickName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.usedInfo.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户手机" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.usedInfo.userPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户使用设备开始时间" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.usedInfo.useTimeStart" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户使用设备结束时间" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.usedInfo.useTimeEnd" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modifyDialogFormVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="modifyDialogFormVisible = false"
                    v-on:click="modifyInfoSubmmit()"
                >确 定</el-button>
            </div>
        </el-dialog>
</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {
    deleteInfo,
    addInfo,
    modifyInfo,
    deviceInit,
    searchInfo
} from "./../api/index";
export default {
    name: "About",
    components: {},
    data: function() {
        return {
            modifyDialogFormVisible: false,
            dialogFormVisible: false,
            form: {
                type: "",
                local: {},
                usedInfo: {}
            },
            modifyForm: {
                type: "",
                name: "",
                des: "",
                local: {
                    longtitue: "",
                    latitue: ""
                },
                status: "0",
                usedInfo: {
                    userNickName: "",
                    userName: "",
                    userPhone: "",
                    useTimeStart: "",
                    useTimeEnd: ""
                }
            },
            formLabelWidth: "200px",
            //
            searcInfo: "",
            searchMsg: {},
            restaurants: [],
            state: "",
            // timeout: null,
            index: 0,
            subIndex: 0,
            deviceCategory: null,
            userInfo: {
                userName: "",
                userPassword: ""
            }
        };
    },
    created() {
        this.deviceInitfun();
        // 请求数据
        this.restaurants = this.loadAll();
        this.userName = this.$route.params.userName;
        this.userPassword = this.$route.params.userPassword;
        setTimeout(() => {
            this.init();
        }, 3000);
    },
    mounted() {
        // 请求数据
        this.restaurants = this.loadAll();
        this.userName = this.$route.params.userName;
        this.userPassword = this.$route.params.userPassword;
        setTimeout(() => {
            this.init();
        }, 3000);
    },
    computed: {},
    methods: {
        async addInfoSubmmit() {
            // let result = await addInfo(this.form)
            let result = await addInfo(this.modifyForm);
            if (result.code == 200) {
                this.$message.success("添加成功");
                this.deviceInitfun();
            } else {
                this.$message.error("添加失败");
            }
        },
        // 地图初始化
        init() {
            const latlng = new qq.maps.LatLng(
                this.deviceCategory[this.index].subDevice[
                    this.subIndex
                ].local.longtitue,
                this.deviceCategory[this.index].subDevice[
                    this.subIndex
                ].local.latitue
            );
            const mapOptions = {
                zoom: 15, // 设置地图缩放级别
                center: latlng, // 设置中心点样式
                mapTypeId: qq.maps.MapTypeId.ROADMAP // 设置地图样式详情参见MapType
            };
            // 获取dom元素添加地图信息
            const map = new qq.maps.Map(
                document.getElementById("container"),
                mapOptions
            );
        },

        handleOpen(key, keyPath) {
            console.log(key, "+++++++++++", keyPath);
        },

        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        subClick(index, subIndex) {
            this.index = index;
            this.subIndex = subIndex;
            this.init();
            let typeName = "";
            switch (this.deviceCategory[this.index].type) {
                case "流行":
                    typeName = "popular";
                    break;
                case "高空作业":
                    typeName = "workHigh";
                    break;
                case "气动工具":
                    typeName = "pneumaticTools";
                    break;
                case "土方设备":
                    typeName = "earthmovingEquipment";
                    break;
                case "物料搬运":
                    typeName = "truck";
                    break;
                case "叉车和拖车":
                    typeName = "forkliftTruck";
                    break;
            }
            this.modifyForm.type = typeName;
            this.modifyForm.name = this.deviceCategory[this.index].subDevice[
                subIndex
            ].name;
            this.modifyForm.des = this.deviceCategory[this.index].subDevice[
                subIndex
            ].des;
            this.modifyForm.status = this.deviceCategory[this.index].subDevice[
                subIndex
            ].status;
            this.modifyForm.local.longtitue = this.deviceCategory[
                this.index
            ].subDevice[subIndex].local.longtitue;
            this.modifyForm.local.latitue = this.deviceCategory[
                this.index
            ].subDevice[subIndex].local.latitue;
            this.modifyForm.usedInfo.userNickName = this.deviceCategory[
                this.index
            ].subDevice[subIndex].usedInfo.userNickName;
            this.modifyForm.usedInfo.userName = this.deviceCategory[
                this.index
            ].subDevice[subIndex].usedInfo.userName;
            this.modifyForm.usedInfo.userPhone = this.deviceCategory[
                this.index
            ].subDevice[subIndex].usedInfo.userPhone;
            this.modifyForm.usedInfo.useTimeStart = this.deviceCategory[
                this.index
            ].subDevice[subIndex].usedInfo.useTimeStart;
            this.modifyForm.usedInfo.useTimeEnd = this.deviceCategory[
                this.index
            ].subDevice[subIndex].usedInfo.useTimeEnd;
        },

        loadAll() {
            return [
                {
                    value: "挖机1"
                },
                {
                    value: "挖机2"
                },
                {
                    value: "挖机3"
                },
                {
                    value: "土方1"
                },
                {
                    value: "土方2"
                },
                {
                    value: "土方3"
                },
                {
                    value: "叉车1"
                },
                {
                    value: "叉车2"
                },
                {
                    value: "气动1"
                },
                {
                    value: "气动2"
                }
            ];
        },

        querySearchAsync(queryString, cb) {
            const restaurants = this.restaurants;
            const results = queryString
                ? restaurants.filter(this.createStateFilter(queryString))
                : restaurants;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 3000 * Math.random());
        },

        createStateFilter(queryString) {
            return state => {
                return (
                    state.value
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) === "0"
                );
            };
        },

        handleSelect(item) {
            console.log(item);
        },

        // 向后台发送要删除的数据
        async deleteUserInfo() {
            let index = this.index;
            let subIndex = this.subIndex;
            if (this.deviceCategory[subIndex].subDevice.length <= 1) {
                this.$message.error("请至少保留一个设备信息");
                return;
            }
            let deviceName = this.deviceCategory[index].subDevice[subIndex]
                .name;
            let type = this.deviceCategory[this.index].type;
            let result = await deleteInfo(type, deviceName);
            if (result.code === 200) {
                this.$message({
                    message: result.message,
                    type: "success"
                });
                this.deviceCategory[subIndex].subDevice.splice(subIndex, 1);
                this.deviceInitfun();
            } else {
                this.$message.error(result.message);
            }
        },

        // 向后台发送要添加的数据
        addUserInfo() {
            console.log(this.index, this.subIndex);
        },

        // 向后台发送要修改的数据
        modifyUserInfo() {
            console.log(this.index, this.subIndex);
        },
        async modifyInfoSubmmit() {
            let tmp = this.deviceCategory[this.index].subDevice[this.subIndex];
            tmp.type = this.deviceCategory[this.index].type;

            let index = this.index;
            let subIndex = this.subIndex;
            let deviceName = this.deviceCategory[index].subDevice[subIndex]
                .name;
            let type = this.deviceCategory[this.index].type;
            let resulta = await deleteInfo(type, deviceName);
            let resultb = await addInfo(this.modifyForm);
            if (resulta.code == 200 && resultb.code == 200) {
                this.$message.success("修改成功");
                this.deviceInitfun()
                this.subClick()
            } else {
                this.$message.erro("修改失败");
            }
        },

        // 初始化数据
        async deviceInitfun() {
            let result = await deviceInit();
            console.log('========++++++++++++++++========+++++++++++');
            console.log("result", result);
            console.log('========++++++++++++++++========+++++++++++');
            this.deviceCategory = result.message;
        },

        // 提交搜索数据
        async searchSubmit() {
            let result = await searchInfo(this.searcInfo);
            this.searchMsg = result.message;
            if (result.code === 200) {
                this.$message.success("查询成功！");
            } else {
                this.$message.error("查询失败！");
            }
        },

        // 清除查询缓存
        menuClick() {
            this.searchMsg = [];
        }
    }
};
</script>

<style scoped lang="less">
.device-wrapper {
    width: 100%;
    height: 100%;
    .box {
        width: 100%;
        height: 700px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .left-list {
            width: 25%;
            height: 100%;
            .tac {
                .page-title {
                    font-size: 20px;
                }
            }
        }
        .right-content {
            width: 75%;
            height: 100%;
            .search {
                width: 100%;
                height: 15%;
                box-sizing: border-box;
                position: relative;
                .search-input {
                    position: absolute;
                    left: 30%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    .input {
                        width: 500px;
                    }
                }
                .add-btn {
                    position: absolute;
                    right: 16px;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }
            .device-detail {
                width: 100%;
                height: 75%;
                border-radius: 10px;
                background-color: #eee;
                box-sizing: border-box;
                margin-bottom: 36px;
                .editor {
                    margin: 50px 50px 0 0;
                    text-align: right;
                    padding-top: 20px;
                }
                .detial-content {
                    width: 95%;
                    height: 400px;
                    margin: 20px auto 0;
                    background-color: rgba(0, 150, 224, 0.15);
                    display: flex;
                    justify-content: space-between;
                    border-radius: 5px;
                    .left {
                        width: 600px;
                        list-style: none;
                        li {
                            text-align: left;
                            margin: 10px 0;
                            label,
                            p {
                                display: inline-block;
                            }
                            p {
                                margin: 0 0 0 10px;
                                font-weight: 300;
                            }
                        }
                    }
                    .right-map {
                        width: 300px;
                        height: 350px;
                        margin: 30px 30px 0 0;
                        .map {
                            width: 100%;
                            height: 300px;
                            border-radius: 10px;
                            overflow: hidden;
                        }
                        .local {
                            font-size: 20px;
                            font-weight: bold;
                            margin-top: 13px;
                        }
                    }
                }
            }
        }
    }
}
li label {
    font-weight: bold;
}
</style>
