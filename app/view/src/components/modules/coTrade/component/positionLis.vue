<template>
  <div class="common-position-table">
    <div class="thead-box block-line a-3-bd a-5-bg">
        <div class="cell" v-for="(item, index) in columns"
        :key="index" :class="item.classes"
        :style="{width:cellWidth[index]}">
          <div>
            <span :class="{'columns-item a-1-bd' : item.promptText}">{{ item.title }}
              <p :class="'tip-text'+ index"
              v-if="item.promptText"
              class="tip-text a-5-bg a-3-bd b-1-cl"
              v-html="item.promptText"></p>
            </span>
          </div>
        </div>
    </div>
    <div class="positionLis-table positionLis-table-box" v-if="tableDataList && positionListNumber">
      <table>
      <!-- <thead class="thead a-3-bd a-5-bg">
        <tr>
          <th v-for="(item, index) in columns" :key="index">
            <div>{{ item.title }}</div>
          </th>
        </tr>
      </thead> -->
      <tbody class="tbody">
        <template v-for="(item, index) in tableDataList">
          <tr class="a-3-bd"
            :key="index"
            :class="item.lineClass">
            <!-- 合约 -->
            <td ref="td0" class="position-td0">
                <div>
                  <i class="sideBg" :class="item.sideClass.bg"></i>
                  <p class="symbol-name"> {{item.name}}</p>
                  <p>
                  <!-- <span :class="item.sideClass.color">{{item.sideText}}</span> -->
                    {{item.positionTypeText}} {{item.leverageLevel}}x
                  </p>
                </div>
            </td>
            <!-- 仓位/可平 -->
            <td ref="td1" class="position-td1">
              <div>
                <p :class="item.sideClass.color">
                  <template
                  v-if="item.orderSide === 'SELL'"
                  >-</template>{{thousandsComma(item.positionVolume)}}
                  / {{thousandsComma(item.canCloseVolume)}}
                </p>
              </div>
            </td>
            <!-- 成本价 -->
            <td ref="td2" class="position-td2">
              <div>{{thousandsComma(item.openAvgPrice)}} </div>
            </td>
            <!-- 标记价格-->
            <td ref="td3" class="position-td3">
              <div>
                <p> {{thousandsComma(item.indexPrice)}} </p>
              </div>
            </td>
            <!-- 强平价格 -->
            <td ref="td4" class="position-td4">
              <div> {{thousandsComma(item.reducePrice)}} </div>
            </td>
            <!-- 占用保证金 -->
            <td ref="td5" class="position-td5">
              <div>
                {{thousandsComma(item.holdAmount)}}
                <p>
                  {{item.marginCoin}}
                  <span class="icon-s"
                    v-if="item.positionType === 2"
                    @click="openMarginDialog(item)">
                    <svg aria-hidden="true" class="icon icon-16">
                      <use xlink:href="#icon-a_2_1"></use>
                    </svg>
                  </span>
                </p>
              </div>
            </td>
            <!-- 保证金率 -->
            <td ref="td6" class="position-td6">
              <div> {{item.marginRate}}  </div>
            </td>
            <!-- 盈亏 （收益率%） -->
            <td ref="td7" class="position-td7">
              <div>
                <p> <span :class="item.openRealizedClass">
                  {{item.openRealizedAmount}} </span> {{item.marginCoin}}</p>
                <p :class="item.returnRateClass"> {{item.returnRate}}</p>
              </div>
            </td>
            <!-- 已结算盈亏 -->
            <td ref="td7_1" class="position-td7_1">
              <div class="position-profit" @click="isShowAmountDialog(item)">
                <span class="a-12-bd h-s b-4-cl">
                  {{item.profitRealizedAmount}} {{item.marginCoin}}
                </span>
                <span class="a-1-bd h-i">{{item.profitRealizedAmount}} {{item.marginCoin}}</span>
              </div>
            </td>
            <!-- 快速平仓 -->
            <td class="close-position" ref="td8">
              <div>
                <p>
                  <input v-model="item.price"
                  @input="priceChange($event, item)"
                    class="a-3-bd b-1-cl"
                    type="text"
                    :placeholder="lanText.text1"/>
                  <input v-model="item.volume"
                    @input="volumeChange($event, item)" class="a-3-bd b-1-cl"
                    type="text"
                    :placeholder="volumePlaceholder"/>
                </p>
                <!-- <span class="close-order-btn b-4-cl"
                @click="closeOrder(1, item)">限价平仓</span>
                  <span class="close-order-btn b-4-cl"
                  @click="closeOrder(2, item)">市价平仓</span> -->
                <p>
                  <c-button width="45%"
                  class="a-6-bg"
                  paddingW="6px"
                  height="26px" marginTop="5px"
                  @click="closeOrder(1, item)">
                    <!-- 限价平仓 -->
                    {{lanText.text2}}
                  </c-button>
                  <c-button width="45%" height="26px"
                    marginTop="5px"
                    class="a-6-bg"
                    paddingW="6px"
                    @click="closeOrder(2, item)">
                    <!-- 市价平仓 -->
                    {{lanText.text3}}
                  </c-button>
                </p>
              </div>
            </td>
            <!-- 条件平仓 -->
            <td ref="td9" class="position-td9">
              <div>
                <span class="edit-stop-order" @click="showStopOrder(item)">
                  <svg t="1604198366477" class="icon icon-24" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2683" width="200" height="200"><path d="M928 288a32 32 0 0 1 31.776 28.256L960 320v512a160 160 0 0 1-153.056 159.84L800 992H384a32 32 0 0 1-3.744-63.776L384 928h416a96 96 0 0 0 95.84-90.368L896 832V320a32 32 0 0 1 32-32z m-288-256a32 32 0 0 1 3.744 63.776L640 96H224a96 96 0 0 0-95.84 90.368L128 192v512a32 32 0 0 1-63.776 3.744L64 704V192a160 160 0 0 1 153.056-159.84L224 32h416z" fill="#828ea1" p-id="2684"></path><path d="M615.776 248.224a32 32 0 0 1 2.464 42.464l-2.464 2.816-316.8 316.8a32 32 0 0 1-47.744-42.496l2.496-2.784 316.8-316.8a32 32 0 0 1 45.248 0z" fill="#828ea1" p-id="2685"></path><path d="M611.232 216.544l-158.4 22.656a32 32 0 0 0-18.08 54.304l135.744 135.744a32 32 0 0 0 54.304-18.08l22.656-158.4A32 32 0 0 0 611.2 216.544z m-33.184 69.44l-7.552 52.768-45.248-45.248 52.8-7.552z" fill="#828ea1" p-id="2686"></path><path d="M408.224 775.776a32 32 0 0 0 42.464 2.464l2.816-2.464 316.8-316.8a32 32 0 0 0-42.496-47.744l-2.784 2.496-316.8 316.8a32 32 0 0 0 0 45.248z" fill="#828ea1" p-id="2687"></path><path d="M376.544 771.232l22.656-158.4a32 32 0 0 1 54.304-18.08l135.744 135.744a32 32 0 0 1-18.08 54.304l-158.4 22.656a32 32 0 0 1-36.224-36.224z m69.44-33.184l52.768-7.552-45.248-45.248-7.552 52.8z" fill="#828ea1" p-id="2688"></path></svg>
                </span>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
      </table>
    </div>
    <!-- 暂无数据 -->
    <div class="not-data" v-if="!tableDataList || !positionListNumber">
      <svg class="icon icon-50" aria-hidden="true">
        <use xlink:href="#icon-g_2"></use>
      </svg>
      <p>
        <!-- 暂无数据 -->
        {{$t('trade.notData')}}
      </p>
    </div>

    <!--  -->
    <c-dialog
      paddingBottom="14px"
      :titleText="$t('futures.positionLis.text26')"
      :showFlag="isAmountDialog"
      :haveOption="ishaveOption"
      @close="dialogClose">
      <div class="amountDialog-box">
        <p class="copywriter">
          <!-- 已实现盈亏为已经结算到用户余额中的收益，包含交易手续费、资金费用、平仓盈亏、结算收益等。 -->
          {{ $t('futures.positionLis.text27') }}
        </p>
        <div class="amount-item a-4-bg">
          <p class="tit">
            <!-- 已结算盈亏 -->
            {{ $t('futures.positionLis.text26') }}
          </p>
          <p class="val profit"
            :class="profitClass(activeAmountData.profitRealizedAmount)">
            {{activeAmountData.profitRealizedAmount}} {{activeAmountData.marginCoin}}
          </p>
        </div>
        <div class="amount-item a-4-bg">
          <p class="tit">
            <span class="f_l">
              <!-- 手续费 -->
              {{ $t('futures.positionLis.text28') }}
            </span>
            <span class="f_r">
              <!-- 平仓盈亏 -->
              {{ $t('futures.positionLis.text29') }}
            </span>
          </p>
          <p class="val b-1-cl">
            <span class="f_l">{{activeAmountData.tradeFee}}
              {{activeAmountData.marginCoin}}</span>
            <span class="f_r">{{activeAmountData.closeProfit}}
              {{activeAmountData.marginCoin}}</span>
          </p>
        </div>
        <div class="amount-item a-4-bg">
          <p class="tit">
            <span class="f_l">
              <!-- 资金费用 -->
              {{ $t('futures.positionLis.text30') }}
            </span>
            <span class="f_r">
              <!-- 持仓结算 -->
              {{ $t('futures.positionLis.text31') }}
            </span>
          </p>
          <p class="val b-1-cl">
            <span class="f_l">{{activeAmountData.capitalFee}}
              {{activeAmountData.marginCoin}}</span>
            <span class="f_r">{{activeAmountData.settleProfit}}
              {{activeAmountData.marginCoin}}</span>
          </p>
        </div>
        <div class="amount-item a-4-bg" v-if="activeAmountData.shareAmount !== '--'">
          <p class="tit">
            <!-- 分摊 -->
            {{ $t('futures.positionLis.text32') }}
          </p>
          <p class="val b-1-cl">{{activeAmountData.shareAmount}} {{activeAmountData.marginCoin}}</p>
        </div>
        <br />
        <br />
      </div>
    </c-dialog>
    <!-- 修改保证金 -->
    <set-marginCoin
      :marginData="editMargindata"
      :isShow="isShowDialog"
      :close="dialogClose">
    </set-marginCoin>
    <!-- 强制提醒(二次确认) -->
    <forcedReminder
      :dataInfo ="confirmData"
      :isShow="forcedReminderShow"
      :close="dialogClose"
      @submitOrder="submitOrder"
    />
    <!-- 止盈止损 -->
    <stopOrder
      :dataInfo ="stopOrderdata"
      :isShow="stopOrderShow"
      :close="dialogClose"
      @submitOrder="submitOrder"
    />

  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/positionLis/positionLis';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/positionLis/positionLis.styl';
import setMarginCoin from './setMarginCoin.vue';
import forcedReminder from './forced-reminder.vue';
import stopOrder from './stopOrder.vue';


export default {
  mixins: [mixin],
  components: { setMarginCoin, forcedReminder, stopOrder },
  mounted() {
    this.init();
  },
  // 组件离开前执行
  beforeDestroy() {},
};
</script>
