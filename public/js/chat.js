var _0x1e6e = ['displayName', 'hash', 'collection', 'firepads', 'doc', 'add', 'FieldValue', 'serverTimestamp', 'catch', 'error', 'messsages', 'orderBy', 'timestamp', 'desc', 'limit', 'forEach', 'type', 'removed', 'data', 'name', 'text', 'profilePicUrl', 'imageUrl', 'messaging', 'getToken', 'then', 'log', 'Got\x20FCM\x20device\x20token:', 'firestore', 'set', 'uid', 'Requesting\x20notifications\x20permission...', 'requestPermission', 'preventDefault', 'value', 'You\x20must\x20sign-in\x20first', 'MaterialSnackbar', 'showSnackbar', 'parentNode', 'MaterialTextfield', 'boundUpdateClassesHandler', '<div\x20class=\x22message-container\x22>', '<div\x20class=\x22message\x22></div>', '<div\x20class=\x22name\x22></div>', '</div>', 'indexOf', 'googleusercontent.com', '?sz=150', 'getElementById', 'removeChild', 'createElement', 'div', 'innerHTML', 'firstChild', 'setAttribute', 'toMillis', 'now', 'children', 'length', 'appendChild', 'getAttribute', 'Child\x20', '\x20has\x20no\x20\x27timestamp\x27\x20attribute', 'insertBefore', '.pic', 'style', 'url(', 'querySelector', '.name', 'textContent', '.message', 'replace', '<br>', 'img', 'addEventListener', 'load', 'src', 'getTime', 'classList', 'visible', 'scrollTop', 'scrollHeight', 'focus', 'firebase', 'app', 'options', 'alert', 'You\x20have\x20not\x20configured\x20and\x20imported\x20the\x20Firebase\x20SDK.\x20', 'Make\x20sure\x20you\x20go\x20through\x20the\x20codelab\x20setup\x20instructions\x20and\x20make\x20', 'sure\x20you\x20are\x20running\x20the\x20codelab\x20using\x20`firebase\x20serve`', 'messages', 'message-form', 'message', 'submit', 'must-signin-snackbar', '#messages-card-container', 'fadeIn', 'css', '-webkit-transform', 'translateY(-12px)', 'transform', 'fadeOut', 'translateY(0px)', 'performance', 'slice', 'auth', 'currentUser', 'photoURL', '/images/profile_placeholder.png']; (function (_0x2a1eb7, _0x30d346) { var _0x3a4152 = function (_0x59a7c3) { while (--_0x59a7c3) { _0x2a1eb7['push'](_0x2a1eb7['shift']()); } }; _0x3a4152(++_0x30d346); }(_0x1e6e, 0x69)); var _0x27d9 = function (_0x475903, _0x58cddb) { _0x475903 = _0x475903 - 0x0; var _0x47cc01 = _0x1e6e[_0x475903]; return _0x47cc01; }; function getProfilePicUrl() { return firebase[_0x27d9('0x0')]()[_0x27d9('0x1')][_0x27d9('0x2')] || _0x27d9('0x3'); } function getUserName() { return firebase[_0x27d9('0x0')]()[_0x27d9('0x1')][_0x27d9('0x4')]; } function isUserSignedIn() { return !!firebase[_0x27d9('0x0')]()[_0x27d9('0x1')]; } function saveMessage(_0x364ee9) { var _0x1632d3 = location[_0x27d9('0x5')]['slice'](0x1); return firebase['firestore']()[_0x27d9('0x6')](_0x27d9('0x7'))[_0x27d9('0x8')](_0x1632d3)[_0x27d9('0x6')]('messsages')[_0x27d9('0x9')]({ 'name': getUserName(), 'text': _0x364ee9, 'profilePicUrl': getProfilePicUrl(), 'timestamp': firebase['firestore'][_0x27d9('0xa')][_0x27d9('0xb')]() })[_0x27d9('0xc')](function (_0x116674) { console[_0x27d9('0xd')]('Error\x20writing\x20new\x20message\x20to\x20Firebase\x20Database', _0x116674); }); } function loadMessages() { var _0x11fa43 = location[_0x27d9('0x5')]['slice'](0x1); var _0x23297f = firebase['firestore']()[_0x27d9('0x6')](_0x27d9('0x7'))[_0x27d9('0x8')](_0x11fa43)[_0x27d9('0x6')](_0x27d9('0xe'))[_0x27d9('0xf')](_0x27d9('0x10'), _0x27d9('0x11'))[_0x27d9('0x12')](0x14); _0x23297f['onSnapshot'](function (_0x2bd285) { _0x2bd285['docChanges']()[_0x27d9('0x13')](function (_0x41c2ef) { if (_0x41c2ef[_0x27d9('0x14')] === _0x27d9('0x15')) { deleteMessage(_0x41c2ef['doc']['id']); } else { var _0x24a0a4 = _0x41c2ef['doc'][_0x27d9('0x16')](); displayMessage(_0x41c2ef['doc']['id'], _0x24a0a4[_0x27d9('0x10')], _0x24a0a4[_0x27d9('0x17')], _0x24a0a4[_0x27d9('0x18')], _0x24a0a4[_0x27d9('0x19')], _0x24a0a4[_0x27d9('0x1a')]); } }); }); } function saveMessagingDeviceToken() { firebase[_0x27d9('0x1b')]()[_0x27d9('0x1c')]()[_0x27d9('0x1d')](function (_0x5936db) { if (_0x5936db) { console[_0x27d9('0x1e')](_0x27d9('0x1f'), _0x5936db); firebase[_0x27d9('0x20')]()[_0x27d9('0x6')]('fcmTokens')[_0x27d9('0x8')](_0x5936db)[_0x27d9('0x21')]({ 'uid': firebase[_0x27d9('0x0')]()[_0x27d9('0x1')][_0x27d9('0x22')] }); } else { requestNotificationsPermissions(); } })[_0x27d9('0xc')](function (_0x4c85e5) { console[_0x27d9('0xd')]('Unable\x20to\x20get\x20messaging\x20token.', _0x4c85e5); }); } function requestNotificationsPermissions() { console['log'](_0x27d9('0x23')); firebase['messaging']()[_0x27d9('0x24')]()[_0x27d9('0x1d')](function () { saveMessagingDeviceToken(); })[_0x27d9('0xc')](function (_0x525b66) { console[_0x27d9('0xd')]('Unable\x20to\x20get\x20permission\x20to\x20notify.', _0x525b66); }); } function onMessageFormSubmit(_0x3c8469) { _0x3c8469[_0x27d9('0x25')](); if (messageInputElement[_0x27d9('0x26')] && checkSignedInWithMessage()) { saveMessage(messageInputElement[_0x27d9('0x26')])[_0x27d9('0x1d')](function () { resetMaterialTextfield(messageInputElement); }); } } function checkSignedInWithMessage() { if (isUserSignedIn()) { return !![]; } var _0x352949 = { 'message': _0x27d9('0x27'), 'timeout': 0x7d0 }; signInSnackbarElement[_0x27d9('0x28')][_0x27d9('0x29')](_0x352949); return ![]; } function resetMaterialTextfield(_0x222856) { _0x222856[_0x27d9('0x26')] = ''; _0x222856[_0x27d9('0x2a')][_0x27d9('0x2b')][_0x27d9('0x2c')](); } var MESSAGE_TEMPLATE = _0x27d9('0x2d') + '<div\x20class=\x22spacing\x22><div\x20class=\x22pic\x22></div></div>' + _0x27d9('0x2e') + _0x27d9('0x2f') + _0x27d9('0x30'); function addSizeToGoogleProfilePic(_0x1092fd) { if (_0x1092fd[_0x27d9('0x31')](_0x27d9('0x32')) !== -0x1 && _0x1092fd[_0x27d9('0x31')]('?') === -0x1) { return _0x1092fd + _0x27d9('0x33'); } return _0x1092fd; } function deleteMessage(_0x530880) { var _0x4d2c5b = document[_0x27d9('0x34')](_0x530880); if (_0x4d2c5b) { _0x4d2c5b[_0x27d9('0x2a')][_0x27d9('0x35')](_0x4d2c5b); } } function createAndInsertMessage(_0x59cf29, _0x34509b) { const _0x509468 = document[_0x27d9('0x36')](_0x27d9('0x37')); _0x509468[_0x27d9('0x38')] = MESSAGE_TEMPLATE; const _0x3558f9 = _0x509468[_0x27d9('0x39')]; _0x3558f9[_0x27d9('0x3a')]('id', _0x59cf29); _0x34509b = _0x34509b ? _0x34509b[_0x27d9('0x3b')]() : Date[_0x27d9('0x3c')](); _0x3558f9[_0x27d9('0x3a')](_0x27d9('0x10'), _0x34509b); const _0x278f1c = messageListElement[_0x27d9('0x3d')]; if (_0x278f1c[_0x27d9('0x3e')] === 0x0) { messageListElement[_0x27d9('0x3f')](_0x3558f9); } else { let _0x35f45a = _0x278f1c[0x0]; while (_0x35f45a) { const _0x2ddb29 = _0x35f45a[_0x27d9('0x40')](_0x27d9('0x10')); if (!_0x2ddb29) { throw new Error(_0x27d9('0x41') + _0x35f45a['id'] + _0x27d9('0x42')); } if (_0x2ddb29 > _0x34509b) { break; } _0x35f45a = _0x35f45a['nextSibling']; } messageListElement[_0x27d9('0x43')](_0x3558f9, _0x35f45a); } return _0x3558f9; } function displayMessage(_0x120ddd, _0x3fe099, _0x451f37, _0x23baa0, _0x190064, _0x46b603) { var _0x23ba63 = document[_0x27d9('0x34')](_0x120ddd) || createAndInsertMessage(_0x120ddd, _0x3fe099); if (_0x190064) { _0x23ba63['querySelector'](_0x27d9('0x44'))[_0x27d9('0x45')]['backgroundImage'] = _0x27d9('0x46') + addSizeToGoogleProfilePic(_0x190064) + ')'; } _0x23ba63[_0x27d9('0x47')](_0x27d9('0x48'))[_0x27d9('0x49')] = _0x451f37; var _0x2c8cb2 = _0x23ba63[_0x27d9('0x47')](_0x27d9('0x4a')); if (_0x23baa0) { _0x2c8cb2[_0x27d9('0x49')] = _0x23baa0; _0x2c8cb2[_0x27d9('0x38')] = _0x2c8cb2[_0x27d9('0x38')][_0x27d9('0x4b')](/\n/g, _0x27d9('0x4c')); } else if (_0x46b603) { var _0x508846 = document[_0x27d9('0x36')](_0x27d9('0x4d')); _0x508846[_0x27d9('0x4e')](_0x27d9('0x4f'), function () { messageListElement['scrollTop'] = messageListElement['scrollHeight']; }); _0x508846[_0x27d9('0x50')] = _0x46b603 + '&' + new Date()[_0x27d9('0x51')](); _0x2c8cb2[_0x27d9('0x38')] = ''; _0x2c8cb2['appendChild'](_0x508846); } setTimeout(function () { _0x23ba63[_0x27d9('0x52')][_0x27d9('0x9')](_0x27d9('0x53')); }, 0x1); messageListElement[_0x27d9('0x54')] = messageListElement[_0x27d9('0x55')]; messageInputElement[_0x27d9('0x56')](); } function checkSetup() { if (!window[_0x27d9('0x57')] || !(firebase[_0x27d9('0x58')] instanceof Function) || !firebase[_0x27d9('0x58')]()[_0x27d9('0x59')]) { window[_0x27d9('0x5a')](_0x27d9('0x5b') + _0x27d9('0x5c') + _0x27d9('0x5d')); } } checkSetup(); var messageListElement = document[_0x27d9('0x34')](_0x27d9('0x5e')); var messageFormElement = document[_0x27d9('0x34')](_0x27d9('0x5f')); var messageInputElement = document[_0x27d9('0x34')](_0x27d9('0x60')); var submitButtonElement = document[_0x27d9('0x34')](_0x27d9('0x61')); var signInSnackbarElement = document[_0x27d9('0x34')](_0x27d9('0x62')); messageFormElement['addEventListener'](_0x27d9('0x61'), onMessageFormSubmit); function openChat() { $(_0x27d9('0x63'))[_0x27d9('0x64')](0x12c); $('#messages-card-container')[_0x27d9('0x65')](_0x27d9('0x66'), _0x27d9('0x67')); $(_0x27d9('0x63'))[_0x27d9('0x65')](_0x27d9('0x68'), _0x27d9('0x67')); } function closeChat() { $(_0x27d9('0x63'))[_0x27d9('0x69')](0x12c); $(_0x27d9('0x63'))['css'](_0x27d9('0x66'), _0x27d9('0x6a')); $(_0x27d9('0x63'))[_0x27d9('0x65')](_0x27d9('0x68'), 'translateY(0px)'); } var firestore = firebase['firestore'](); firebase[_0x27d9('0x6b')](); var hash; function getHash() { hash = location['hash'][_0x27d9('0x6c')](0x1); if (!hash) { setTimeout(getHash, 0x64); return; } loadMessages(); } getHash();