﻿
Github 相關記事
-----------------------------------------------

Something
-----------------------------------------------
account: tkli-tw

email: tkli.tw@gmail.com


Note
-----------------------------------------------

1. 新增一個 repository
-----------------------------------------------

先移進一個目錄，然後打，
>$ git init


2. 查看目前 git 的狀態
-----------------------------------------------
>$ git status


3. 新增 git 要追蹤的目標
-----------------------------------------------
>$ git add <filename>

可用
>$ git add *
新增該目錄內所有檔案

注意一下，git 並不會自動 將追蹤目標的更新 納入，
當 git add 某檔案後，若該檔案又修改了，請再做一次 git add ，這樣才能將該檔案的最新的更新納入。


4. 完成 git
-----------------------------------------------
當開發到一個階段，要上傳前要做 commit 的動作，

>$ git commit -m '打上 關於這次修訂 你想說的話'

commit 的動作完成後，可以 git status 檢查情況。


5. 上傳
-----------------------------------------------
commit 後，可上傳至遠端伺服器，

使用 git push 指令，但這裡有些複雜，

第一是，你的版本如果跟遠端伺服器有衝突，
也就是說，'你不是他生的' 的時候，就會上傳不了(我現在只知道這樣)，
就是，你的版本必需要是從目前遠端伺服器上的 版本 下載後 修訂的，才能上傳做更新，
(否則的話，應該要自行做合併，也就是，下載最新版，跟你的版本做 merge，可惜目前還不會)

第二，就是要先設定好你的遠端伺服器，使用 git remote 指令，以我的例子：

>$ git remote  別名   網址

>$ git remote origin https://github.com/tkli-tw/UCHHomepage.git

不過，origin 好像一開始就有的，可以用

>$ git remote -v 

來檢查，另外要重定義，可以先殺掉，

>$ git remote rm orgin

設定好 遠端伺服器之後，就能上傳了，指令很簡單 (不過搞了我好久)

>$ git push origin master

其中 master 是 branch(分支) 的名字，我還有玩到那邊，所以，就只能用 master 了，
不過， branch 是這個版本控制好玩的地方，等有空再玩玩，先到這 ..........tkli..20131022


6. update 更新
-----------------------------------------------
基本上，如果你一直都是單向的 從你的 source 上傳更新上 github 應該只要用上面的上傳就OK了，
但，萬一你手賤，直接從網站，或者另外的地方，變更了 github 上的內容，
那麼 github上的版本訊息和你自己 local 端的就會不同，此時，怎麼辦呢？

使用
>$ git pull origin master

將 github 上的內容更新到 local 端，然後再上傳即可，
但若是下載後有衝突，好像就要 merge ，而且還有 rebase 和解決衝突的問題，以後再研究 ...... tkli. 20131023



