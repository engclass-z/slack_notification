// ここに処理を書く

function sendToSlack(body, channel) {
  const url = 'https://hooks.slack.com/services/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';
  const data = {
    channel: channel,
    username: 'Googleフォーム Bot',
    text: body,
    icon_emoji: ':date: ',
  };
  const payload = JSON.stringify(data);
  const options = {
    method: 'POST',
    contentType: 'application/json',
    payload: payload,
  };
  const response = UrlFetchApp.fetch(url, options);
  response;
}

function test() {
  sendToSlack('テスト通知確認です', '#class-エンジニア-03_168開発メンバー用');
}

function onFormSubmit(e) {
  const body = 'Slack通知テストフォームが来たよ！\n';
  const itemResponse = e.response.getItemResponses();

  for (let j = 0; j < itemResponse.length; j++) {
    const formData = itemResponse[j];
    const title = formData.getItem().getTitle();
    const response = formData.getResponse();

    switch (title) {
      case '日付':
        date = response;
        break;
      case '氏名':
        names = response;
        break;
      case '好きな言語':
        language = response;
        break;
      default:
        break;
    }
  }
  const bodyPublic = body + '日付:' + date + '\n氏名:' + names + '\n好きな言語:' + language;
  sendToSlack(bodyPublic, '#class-エンジニア-03_168開発メンバー用');
}

test();
onFormSubmit('testtesttest');
