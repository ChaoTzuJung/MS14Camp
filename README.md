# 台灣微軟 14 屆 領袖營-APP

## Summary

這是一個用 React 完成的解任務RPG遊戲，專門為台灣微軟第 14 屆領袖營設計，內容包含：抽房間系統，掃瞄 QRCode 解任務，即時任務進度通知，對話一覽以及獲得裝備一覽，其中資料傳輸過程使用 JWT 認證身份。

使用 `react-simple-chatbot` , `socket.io`, `react` 的解任務型APP

## [live Demo](https://agile-ridge-65560.herokuapp.com/)

> Updated: This app hosting is crash (2019/04/16)
---

1. 安裝

```
npm install  or  yarn
```

2. 執行

```bash
npm run start  or  yarn start
```

3. `http://localhost:5000`


4. 開發

```bash
npm install -g concurrently
npm install --dev  or yarn --dev

npm run dev  or yarn dev
```


```
npm install  or  yarn
```

---

| 任務 | 勇者 | 完成度 |
| --- | --- | --- |
| 寫出 APP | 寶哥，Paul，子榮 | O |
| 加入房間抽籤 | 寶哥，Paul | X |

## 彩蛋機器人 名字對照

| 中文 | 英文 | 快取 |
| --- | --- | --- |
| 被釋放的機器人 | x | rsc_cache_chatbot |

-------

### 介紹 More Detail

小弟很榮幸能與同是微軟研發助理的實習生一起開發十四屆領袖營 APP，今年的目標是利用科技來簡化領袖營中會遇到的繁瑣的問題，例如第一天的抽房間系統以及第二天我們運用 Web App 貫穿整個 RPG 遊戲…等等

- DAY 1 登入畫面，認證身份
![](https://i.imgur.com/PSwdMKg.png)

讓100多位實習隨機抽房間<br>
![](https://i.imgur.com/AEmqtaA.png)

- DAY 2 RPG跑關活動
![](https://i.imgur.com/BtNFBaI.png)

紀錄每個小隊破關進度<br>
![](https://i.imgur.com/D8J2SIt.png)

跟 NPC對話 尋找謎題<br>
![](https://i.imgur.com/5VLyuop.png)

搜集破關道具<br>
![](https://i.imgur.com/xLglVZs.png)

