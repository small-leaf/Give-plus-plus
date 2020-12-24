# 二手交易平台 - 前端系統

## 可使用的指令
- `npm install`：安裝所需第三方套件
- `yarn start`：以開發模式在 http://localhost:3000/ 啟動專案
- `yarn cypress:open`：啟動 Cypress E2E 測試工具
- `yarn cypress:run`：執行 Cypress E2E 測試，並生成或更新測試影片
- `yarn build`：打包並建立此專案的 Production 版本

## 開發注意事項
- 有任何動作之前，一定要開新的 branch，切勿直接改動 master 的東西
- 所有資料夾都有依據不同的功能來區分
  * 請各位依照指定的資料夾結構進行開發
- useHooks 底下用 handle、middleware 用 get api 底下用跟 middleware 一樣的命名加上 API結尾
  * useProduct -> handleGetProductCategories 
  * middleware -> getProductCategories
  * reduce -> setProductCategories
  * api -> getProductCategoriesAPI
- 命名變數 CRUD 統一用的寫法
  * 新增 Post
  * 取得 Get
  * 編輯 Update
  * 刪除 Delete
- 所有的「顏色、字型、按鈕」格式都已經訂好了，請大家依照定義的格式來開發 
  * style 的格式寫在 `src/constants/style.js `
- 開發時請考慮是否有不同身份的角色需要使用同一頁面，若是有的話請一並考慮進去（註1）
- 要串 API 請先將「後端 API Server」啟動
- 要改動 app.js
  * 先在群組告知
  * 另外開一條專門改 app.js 的 branch
  * 改完之後發 pull request 請第二個人幫你檢查
  * merge 之後於群組通知大家更新
- 若發現缺少頁面，請勿直接新增，請先另外開一條新的 branch 單獨處理新增頁面的功能（註2）
  * 流程與改動 app.js 相同
  

版型可參考：[demo](https://krebikshaw.github.io/final-project/prepare/)

## 資料夾格式：
- 頁面寫在 src/pages
- 元件寫在 src/components
- 邏輯寫在 src/hooks
- 資料寫在 src/redux/slices
- api寫在 src/webAPI

## 註解
- 註1：像是訂單詳細資訊頁面，OrderDetailPage 買家及賣家都會用到此畫面，需要在開發時加入判斷的功能。只要有複數身份會用到的畫面，都要特別注意！
- 註2：新增頁面，需要改動到的地方除了 pages 以外，還會有 app.js, pages/xxPages/index.js，由於 app.js 是共用的，所以需要另外開 branch 處理

**請每天定時更新 Projects 的開發進度**



