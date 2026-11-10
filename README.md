# Tammy｜作品集

網址：https://yen-ling724.github.io/

## 新增作品

打開 `projects.json`，複製一段 `{ ... }` 再改內容就好。

| 欄位 | 說明 |
|---|---|
| title | 專案名稱 |
| summary | 一句話說明 |
| tags | 標籤 |
| category | 分類（篩選按鈕會自動產生） |
| emoji | 沒有截圖時顯示的圖示 |
| image | 截圖路徑，例如 `images/xxx.png`（選填） |
| color | 封面底色：lime / sky / pink / orange / purple / yellow |
| demo / code | 網站與程式碼的網址（選填） |
| sample | 設為 true 會顯示「範例」標籤，換成正式內容時請刪掉 |

## 換配色

`index.html` 第 2 行的 `data-theme` 決定配色，目前是 `sunny`（陽光柳橙）。
可用的配色都寫在 `style.css` 最上面：pop、mint、berry、sunset、night、clean、sunny、mango。
