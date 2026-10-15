# Coffee Chat 练习室

在手机上练英文 coffee chat 的网页 App。用麦克风直接说话，对方（AI 扮演的从业者）会把回复读出来；每个人的背景、性格、说话风格和你认识 Ta 的方式都是随机生成的。聊完给出中文点评，练习记录保存在手机里。

## 怎么用（iPhone）

1. 用 **Safari** 打开 App 的网址。
2. 第一次打开时，在「⚙️ AI 设置」里粘贴 API key，点「保存并测试」。页面里有拿免费 Gemini key 的步骤。
3. 点底部的分享按钮 →「添加到主屏幕」，桌面上就会出现 App 图标。
4. 第一次按「🎤 按一下开始说」时，允许使用麦克风。

麦克风用不了时：「设置 → App → Safari → 麦克风」选允许，并在「设置 → 通用 → 键盘」里打开「启用听写」。如果从主屏幕图标打开时麦克风不工作，就直接在 Safari 里用。

## 隐私

- API key 和练习记录只保存在你自己设备的浏览器里，不会上传到这个仓库或其他地方。
- 聊天内容会发给你选择的 AI 服务（Google Gemini 或 Anthropic Claude）来生成回复。
- 记录在「练习记录」页可以导出成文件备份。

## 文件

| 文件 | 内容 |
|---|---|
| `index.html` | 整个 App（界面、随机人物生成器、语音、AI 调用、记录） |
| `manifest.json` | 添加到主屏幕用的 App 信息 |
| `icon-*.png` | App 图标 |

## 出处

聊天结构和部分原则改编自 [Coffee Chat Playbook](https://github.com/cwlin0131/coffee-chat-prep)（CW Lin，CC BY 4.0），已改为求职场景。
