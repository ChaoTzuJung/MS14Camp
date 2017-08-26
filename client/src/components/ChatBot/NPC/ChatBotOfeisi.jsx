/*
 * 歐菲斯司令 NPC 元件， 不加入 Redux ，用 state 對話用客製元件回應
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import ChatBot, { Loading } from 'react-simple-chatbot';

import { ofeisi_greet } from '../NPCLines/greetLine';
import { ofeisi_dialog } from '../NPCLines/dialogLine';

import * as actions from '../../../actions';

// Chat bot theme
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#ff5722',
  headerFontColor: '#fff',
  botBubbleColor: '#ff5722',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};


class ChatBotOfeisi extends Component {
  constructor(props) {
    super(props);

    this.handleAddProgress = this.handleAddProgress.bind(this);
  }

  handleAddProgress(addNum) {
    this.props.addBlueProgress(addNum)
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          cache
          cacheName="rsc_cache_ofeisi"
          botDelay={300}
          customDelay={300}
          headerTitle="歐菲斯"
          placeholder="說點什麼..."
          hideUserAvatar
          floating={true}
          steps={[{
              id: '1',
              message: ofeisi_greet(),
              trigger: '2'
            }, {
              id: '2',
              user: true,
              trigger: ({ value, steps }) => ofeisi_dialog(value)[1],
            }, {
              id: '3',
              message: ({ previousValue, steps }) => {
                { this.handleAddProgress(ofeisi_dialog(previousValue)[2]) }
                return ofeisi_dialog(previousValue)[0];
              },
              trigger: '2'
            }, {
              id: '4',
              message: '再見！',
              end: true,
            }
          ]}
        />
      </ThemeProvider>
    );
  };
};

export default connect(null, actions)(ChatBotOfeisi);