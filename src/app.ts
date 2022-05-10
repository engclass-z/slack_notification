import FormsOnFormSubmit = GoogleAppsScript.Events.FormsOnFormSubmit;

const webhookUrl = 'Webhook URL'; //  Incoming Webhook の Webhook URL
const username = '名前'; // 通知する際のユーザー名
const mention = '<メンション先>'; // @here => <!here>, @channel => <!channel>, 個人 => <@user_id>
const title = 'タイトル'; // 通知する際のタイトル名
const channelName = 'チャンネル名'; // 通知させたいチャンネル名 ex) #Slack通知テスト

const sendToSlack = (
  fallback: string,
  fields: { title: string; value: any; short: boolean }[],
  channel: string
) => {
  const url = webhookUrl;
  const data = {
    channel: channel,
    username: username,
    attachments: [
      {
        fallback: fallback,
        text: mention + '\n' + title,
        fields: fields,
        color: 'good', // 左線の色
      },
    ],
  };
  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(data),
    muteHttpExceptions: true,
  });
  Logger.log(response);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const test = () => {
  sendToSlack('テスト通知確認です', [], channelName);
};

const responseToText = (formAnswer: any) => {
  switch (formAnswer.getItem().getType()) {
    case FormApp.ItemType.CHECKBOX:
      return formAnswer.getResponse().join('\n');
      break;
    case FormApp.ItemType.GRID: {
      const gridResponses = formAnswer.getResponse();
      return formAnswer
        .getItem()
        .asGridItem()
        .getRows()
        .map(function (rowName: string, index: number) {
          Logger.log(rowName);
          return rowName + ': ' + gridResponses[index];
        })
        .join('\n');
      break;
    }
    case FormApp.ItemType.CHECKBOX_GRID: {
      const checkboxGridResponses = formAnswer.getResponse();
      return formAnswer
        .getItem()
        .asCheckboxGridItem()
        .getRows()
        .map(function (rowName: string, index: number) {
          Logger.log(rowName);
          return rowName + ': ' + checkboxGridResponses[index];
        })
        .join('\n');
      break;
    }
    default:
      return formAnswer.getResponse();
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onFormSubmit = (e: FormsOnFormSubmit) => {
  const formAnswers = e.response.getItemResponses();

  const fallback = formAnswers
    .map(function (formAnswer) {
      return formAnswer.getItem().getTitle() + ': ' + formAnswer.getResponse();
    })
    .join('\n');

  const fields = formAnswers.map(function (formAnswer) {
    const value = responseToText(formAnswer);
    return {
      title: formAnswer.getItem().getTitle(),
      value: value,
      short: false, // 左右２列で表示
    };
  });

  sendToSlack(fallback, fields, channelName);
};
