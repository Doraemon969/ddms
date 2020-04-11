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
                            default-active="2"
                            active-text-color="#ffd04b"
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
                            v-model="state"
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请输入要搜索的内容"
                            @select="handleSelect"
                        ></el-autocomplete>
                    </div>
                    <div class="add-btn">
                        <el-button v-on:click="addUserInfo">添加</el-button>
                    </div>
                </div>
                <div class="device-detail">
                    <div class="editor">
                        <el-row>
                            <el-button v-on:click="deleteUserInfo">删除</el-button>
                            <el-button v-on:click="modifyUserInfo">修改</el-button>
                        </el-row>
                    </div>
                    <div class="detial-content">
                        <ul class="left">
                            <ul style="list-style:none;">
                                <li>
                                    <label>设备名称：</label>
                                    <p>{{ deviceCategory[index].subDevice[subIndex].name }}</p>
                                </li>
                                <li>
                                    <label>设备描述：</label>
                                    <p>{{ deviceCategory[index].subDevice[subIndex].des }}</p>
                                </li>
                                <li>
                                    <label>日租金：</label>
                                    <p>{{ deviceCategory[index].subDevice[subIndex].price }}</p>
                                </li>
                                <li v-if="deviceCategory[index].subDevice[subIndex].status === 0">
                                    <label>使用状态：</label>
                                    <p>设备处于空闲状态</p>
                                </li>
                                <li
                                    v-else-if="deviceCategory[index].subDevice[subIndex].status === 1"
                                >
                                    <label>使用状态：</label>
                                    <p>用户使用中</p>
                                </li>
                                <li style="margin-top:40px;font-weight:bold;">
                                    <label>租客信息</label>
                                </li>
                                <div v-if="deviceCategory[index].subDevice[subIndex].status === 1">
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
                                <div id="container" style="width:100%;height:100%;">地图站位</div>
                            </div>
                            <p class="local">设备所在位置</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { deleteInfo, addInfo, modifyInfo, deviceInit } from './../api/index'
export default {
    name: "About",
    components: {},
    data: function() {
        return {
            restaurants: [],
            state: "",
            timeout: null,
            index: 0,
            subIndex: 0,
            deviceCategory: [
                {
                    index: 0,
                    type: "流行",
                    subDevice: [
                        {
                            name: "挖机1",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "31.9624120000",
                                latitue: "118.7483024600"
                            },
                            status: 1, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        },
                        {
                            name: "挖机2",
                            des: "这23sdgdfgaf让你欲23ref罢不能！",
                            price: 0.02,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "brj",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        },
                        {
                            name: "挖机3",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        }
                    ]
                },
                {
                    index: 1,
                    type: "高空作业",
                    subDevice: [
                        {
                            name: "挖机1",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        },
                        {
                            name: "挖机2",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        },
                        {
                            name: "挖机3",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        }
                    ]
                },
                {
                    index: 2,
                    type: "气动工具",
                    subDevice: [
                        {
                            name: "挖机1",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        },
                        {
                            name: "挖机2",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        },
                        {
                            name: "挖机3",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        }
                    ]
                },
                {
                    index: 3,
                    type: "土方设备",
                    subDevice: [
                        {
                            name: "挖机1",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        },
                        {
                            name: "挖机2",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        },
                        {
                            name: "挖机3",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        }
                    ]
                },
                {
                    index: 4,
                    type: "物料搬运",
                    subDevice: [
                        {
                            name: "挖机1",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        },
                        {
                            name: "挖机2",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        },
                        {
                            name: "挖机3",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        }
                    ]
                },
                {
                    index: 5,
                    type: "叉车和拖车",
                    subDevice: [
                        {
                            name: "挖机1",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        },
                        {
                            name: "挖机2",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        },
                        {
                            name: "挖机3",
                            des: "这款新型挖机，强悍无比，让你欲罢不能！",
                            price: 0.01,
                            local: {
                                longtitue: "38.6518",
                                latitue: "104.07642"
                            },
                            status: 0, // 0代表未被使用，1代表在被使用
                            usedInfo: {
                                userNickName: "brj-snail",
                                userName: "卞瑞江",
                                userPhone: "13814545080",
                                useTimeStart: "20200202",
                                useTimeEnd: "20200303"
                            }
                        }
                    ]
                }
            ],
            userInfo: {
                userName: "",
                userPassword: ""
            }
        };
    },
    mounted() {
        // 请求数据
        this.restaurants = this.loadAll();
        this.userName = this.$route.params.userName;
        this.userPassword = this.$route.params.userPassword;
        // this.init();
        this.deviceInitfun();
    },
    computed: {
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
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, "+++++++++++", keyPath);
        },

        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        subClick(index, subIndex) {
            this.index = index;
            this.subIndex = subIndex;
        },

        loadAll() {
            return [
                {
                    value: "三全鲜食（北新泾店）",
                    address: "长宁区新渔路144号"
                },
                {
                    value: "Hot honey 首尔炸鸡（仙霞路）",
                    address: "上海市长宁区淞虹路661号"
                },
                {
                    value: "新旺角茶餐厅",
                    address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
                },
                {
                    value: "泷千家(天山西路店)",
                    address: "天山西路438号"
                },
                {
                    value: "胖仙女纸杯蛋糕（上海凌空店）",
                    address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
                },
                {
                    value: "贡茶",
                    address: "上海市长宁区金钟路633号"
                },
                {
                    value: "豪大大香鸡排超级奶爸",
                    address: "上海市嘉定区曹安公路曹安路1685号"
                },
                {
                    value: "茶芝兰（奶茶，手抓饼）",
                    address: "上海市普陀区同普路1435号"
                },
                {
                    value: "十二泷町",
                    address: "上海市北翟路1444弄81号B幢-107"
                },
                {
                    value: "星移浓缩咖啡",
                    address: "上海市嘉定区新郁路817号"
                },
                {
                    value: "阿姨奶茶/豪大大",
                    address: "嘉定区曹安路1611号"
                },
                {
                    value: "新麦甜四季甜品炸鸡",
                    address: "嘉定区曹安公路2383弄55号"
                },
                {
                    value: "Monica摩托主题咖啡店",
                    address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
                },
                {
                    value: "浮生若茶（凌空soho店）",
                    address: "上海长宁区金钟路968号9号楼地下一层"
                },
                {
                    value: "NONO JUICE  鲜榨果汁",
                    address: "上海市长宁区天山西路119号"
                },
                {
                    value: "CoCo都可(北新泾店）",
                    address: "上海市长宁区仙霞西路"
                },
                {
                    value: "快乐柠檬（神州智慧店）",
                    address: "上海市长宁区天山西路567号1层R117号店铺"
                },
                {
                    value: "Merci Paul cafe",
                    address: "上海市普陀区光复西路丹巴路28弄6号楼819"
                },
                {
                    value: "猫山王（西郊百联店）",
                    address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
                },
                {
                    value: "枪会山",
                    address: "上海市普陀区棕榈路"
                },
                {
                    value: "纵食",
                    address: "元丰天山花园(东门) 双流路267号"
                },
                {
                    value: "钱记",
                    address: "上海市长宁区天山西路"
                },
                {
                    value: "壹杯加",
                    address: "上海市长宁区通协路"
                },
                {
                    value: "唦哇嘀咖",
                    address:
                        "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
                },
                {
                    value: "爱茜茜里(西郊百联)",
                    address: "长宁区仙霞西路88号1305室"
                },
                {
                    value: "爱茜茜里(近铁广场)",
                    address:
                        "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
                },
                {
                    value: "鲜果榨汁（金沙江路和美广店）",
                    address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
                },
                {
                    value: "开心丽果（缤谷店）",
                    address: "上海市长宁区威宁路天山路341号"
                },
                {
                    value: "超级鸡车（丰庄路店）",
                    address: "上海市嘉定区丰庄路240号"
                },
                {
                    value: "妙生活果园（北新泾店）",
                    address: "长宁区新渔路144号"
                },
                {
                    value: "香宜度麻辣香锅",
                    address: "长宁区淞虹路148号"
                },
                {
                    value: "凡仔汉堡（老真北路店）",
                    address: "上海市普陀区老真北路160号"
                },
                {
                    value: "港式小铺",
                    address: "上海市长宁区金钟路968号15楼15-105室"
                },
                {
                    value: "蜀香源麻辣香锅（剑河路店）",
                    address: "剑河路443-1"
                },
                {
                    value: "北京饺子馆",
                    address: "长宁区北新泾街道天山西路490-1号"
                },
                {
                    value: "饭典*新简餐（凌空SOHO店）",
                    address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
                },
                {
                    value: "焦耳·川式快餐（金钟路店）",
                    address: "上海市金钟路633号地下一层甲部"
                },
                {
                    value: "动力鸡车",
                    address: "长宁区仙霞西路299弄3号101B"
                },
                {
                    value: "浏阳蒸菜",
                    address: "天山西路430号"
                },
                {
                    value: "四海游龙（天山西路店）",
                    address: "上海市长宁区天山西路"
                },
                {
                    value: "樱花食堂（凌空店）",
                    address: "上海市长宁区金钟路968号15楼15-105室"
                },
                {
                    value: "壹分米客家传统调制米粉(天山店)",
                    address: "天山西路428号"
                },
                {
                    value: "福荣祥烧腊（平溪路店）",
                    address: "上海市长宁区协和路福泉路255弄57-73号"
                },
                {
                    value: "速记黄焖鸡米饭",
                    address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
                },
                {
                    value: "红辣椒麻辣烫",
                    address: "上海市长宁区天山西路492号"
                },
                {
                    value: "(小杨生煎)西郊百联餐厅",
                    address: "长宁区仙霞西路88号百联2楼"
                },
                {
                    value: "阳阳麻辣烫",
                    address: "天山西路389号"
                },
                {
                    value: "南拳妈妈龙虾盖浇饭",
                    address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
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
                        .indexOf(queryString.toLowerCase()) === 0
                );
            };
        },

        handleSelect(item) {
            console.log(item);
        },

        // 向后台发送要删除的数据
        async deleteUserInfo(){
          let index = this.index
          let subIndex = this.subIndex
          let deviceName  = this.deviceCategory[index].subDevice[subIndex].name
          let type  = this.deviceCategory[this.index].type
          let result = await deleteInfo(type, deviceName)
            if (result.code === 200) {
            this.$message({
                message: result.message,
                type: 'success'
                })
                // 删除对应的数据
                if(this.deviceCategory[subIndex].subDevice.length > 1){
                    this.deviceCategory[subIndex].subDevice.splice(subIndex,1)
                }else{
                    this.$message.error("清保留一个设备信息")
                }
            } else {
                this.$message.error(result.message)
            }
        },

        // 向后台发送要添加的数据
        addUserInfo(){
          console.log(this.index, this.subIndex);
        },

        // 向后台发送要修改的数据
        modifyUserInfo(){
          console.log(this.index, this.subIndex);
        },

        // 初始化数据
        async deviceInitfun(){
            let result = await deviceInit();
            // alert(result)
            console.log('================', );
            console.log(result);
            console.log('================', );
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
