var _0x1aac = ['#firepad', 'resizable', 'element', 'parent', 'width', 'outerWidth', 'next', 'css', 'log', 'auth', 'onAuthStateChanged', 'currentUser', 'dispose', 'remove', 'hash', 'replace', 'location', 'database', 'firepads', 'ref', 'child', 'uid', 'firepadHistory', 'set', 'displayName', 'firepadHashes', 'key', 'getElementById', 'firepad', 'monokai', 'text/x-python', 'once', 'value', 'then', 'locked', 'fromCodeMirror', 'print(\x27Hello,\x20world!\x27)', 'fromDiv', 'users', 'firepad-userlist', 'ready', 'isHistoryEmpty', '#my-pads-list', 'empty', 'synced', 'text', 'getText', 'output', 'off', 'terminal', 'scrollTop', 'scrollHeight', 'val', '#output', 'append', '<pre>', '<br></pre>', '#indicator', 'appendTo', '#terminal', 'focus', '#url', 'click', 'select', 'preventDefault', 'getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'undefined', 'parse', 'stringify', 'getItem', 'demo-pad-list', 'join', 'push', 'sort', 'length', 'prepend', '<div></div>', 'addClass', 'my-pads-item', '<a></a>', 'dropdown-item', 'attr', 'href', 'toString', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 'charAt', 'floor', 'random', '#theme-switch', 'setOption', 'theme', 'default', 'Cleared\x20firebase\x20node', 'reload', 'Cleared\x20localStorage', 'slice', 'split', 'firestore', 'counters', 'doc', 'lines-run', '/code.json', 'update', 'FieldValue', 'increment', 'numLines', '\x20Guest\x20ran\x20the\x20code:\x20\x0a', 'get', 'readOnly', 'nocursor', 'prop', 'disabled']; (function (_0x338241, _0x3bc02c) { var _0x198f0d = function (_0x596339) { while (--_0x596339) { _0x338241['push'](_0x338241['shift']()); } }; _0x198f0d(++_0x3bc02c); }(_0x1aac, 0x7c)); var _0x5073 = function (_0xc929af, _0x32b521) { _0xc929af = _0xc929af - 0x0; var _0x5a101f = _0x1aac[_0xc929af]; return _0x5a101f; }; console[_0x5073('0x0')]('Loaded\x20main.js'); var firepad = null, userList = null, codeMirror = null; var user = null; var userId = null; var ignoreExisting = !![]; firebase[_0x5073('0x1')]()[_0x5073('0x2')](function (_0x3b0557) { if (_0x3b0557) { user = firebase[_0x5073('0x1')]()[_0x5073('0x3')]; joinFirepadForHash(); setTimeout(function () { $(window)['on']('hashchange', joinFirepadForHash); }, 0x0); } else { user = null; joinFirepadForHash(); setTimeout(function () { $(window)['on']('hashchange', joinFirepadForHash); }, 0x0); } }); function joinFirepadForHash() { if (firepad) { firepad[_0x5073('0x4')](); userList['dispose'](); $('.CodeMirror')[_0x5073('0x5')](); } var _0x39b89d = window['location'][_0x5073('0x6')][_0x5073('0x7')](/#/g, '') || randomString(0xa); var _0x1fc91b = window[_0x5073('0x8')]['toString']()[_0x5073('0x7')](/#.*/, '') + '#' + _0x39b89d; var _0xd79a24 = firebase[_0x5073('0x9')]()['ref'](_0x5073('0xa')); if (user) { var _0x33a86e = firebase['database']()[_0x5073('0xb')](_0x5073('0xa'))[_0x5073('0xc')](_0x39b89d); userId = user[_0x5073('0xd')]; _0x33a86e[_0x5073('0xc')](user[_0x5073('0xd')]); var _0x1da9b3 = getDateTime(); firebase[_0x5073('0x9')]()[_0x5073('0xb')](_0x5073('0xe'))[_0x5073('0xc')](userId)['child']('name')[_0x5073('0xf')](user[_0x5073('0x10')]); firebase[_0x5073('0x9')]()[_0x5073('0xb')]('firepadHistory')[_0x5073('0xc')](userId)[_0x5073('0xc')](_0x5073('0x11'))[_0x5073('0xc')](_0x39b89d)[_0x5073('0xf')](_0x1da9b3); } else { var _0x33a86e = firebase[_0x5073('0x9')]()[_0x5073('0xb')](_0x5073('0xa'))[_0x5073('0xc')](_0x39b89d); userId = _0x33a86e['push']()[_0x5073('0x12')]; } codeMirror = CodeMirror(document[_0x5073('0x13')](_0x5073('0x14')), { 'lineWrapping': !![], 'lineNumbers': !![], 'theme': _0x5073('0x15'), 'mode': _0x5073('0x16'), 'autoCloseBrackets': !![], 'matchBrackets': !![], 'indentUnit': 0x3, 'tabSize': 0x3, 'indentWithTabs': !![] }); var _0x33a86e = firebase[_0x5073('0x9')]()[_0x5073('0xb')](_0x5073('0xa'))['child'](_0x39b89d); _0x33a86e[_0x5073('0x17')](_0x5073('0x18'))[_0x5073('0x19')](function (_0x447a54) { if (_0x447a54['val']()['locked'] && _0x447a54['val']()[_0x5073('0x1a')] == !![]) { lockFirepad(); } }); firepad = Firepad[_0x5073('0x1b')](_0x33a86e, codeMirror, { 'richTextShortcuts': ![], 'richTextToolbar': ![], 'defaultText': _0x5073('0x1c'), 'userId': userId }); if (user) { userList = FirepadUserList[_0x5073('0x1d')](_0x33a86e[_0x5073('0xc')](_0x5073('0x1e')), document[_0x5073('0x13')](_0x5073('0x1f')), userId, user[_0x5073('0x10')]); } else { userList = FirepadUserList['fromDiv'](_0x33a86e[_0x5073('0xc')]('users'), document[_0x5073('0x13')](_0x5073('0x1f')), userId, null); } firepad['on'](_0x5073('0x20'), function () { if (firepad[_0x5073('0x21')]()) { firepad['setText']('print(\x27Hello,\x20world!\x27)'); } if (!user) { ensurePadInList(_0x39b89d); } $(_0x5073('0x22'))[_0x5073('0x23')](); buildPadList(); }); firepad['on'](_0x5073('0x24'), function (_0x4b6ebc) { firebase[_0x5073('0x9')]()[_0x5073('0xb')](_0x5073('0xa'))[_0x5073('0xc')](_0x39b89d)[_0x5073('0xc')](_0x5073('0x25'))['set'](firepad[_0x5073('0x26')]()); }); var _0xb8fd7f = firebase['database']()['ref'](_0x5073('0xa'))[_0x5073('0xc')](_0x39b89d)['child'](_0x5073('0x27')); _0xb8fd7f[_0x5073('0x28')](); document[_0x5073('0x13')](_0x5073('0x29'))[_0x5073('0x2a')] = document[_0x5073('0x13')](_0x5073('0x29'))[_0x5073('0x2b')]; _0xb8fd7f['on'](_0x5073('0x18'), _0x50a91b => { if (_0x50a91b['val']()) { console['log'](_0x50a91b[_0x5073('0x2c')]()); $(_0x5073('0x2d'))[_0x5073('0x2e')](_0x5073('0x2f') + _0x50a91b[_0x5073('0x2c')]() + _0x5073('0x30')); $(_0x5073('0x31'))[_0x5073('0x32')](_0x5073('0x33')); document[_0x5073('0x13')](_0x5073('0x29'))[_0x5073('0x2a')] = document[_0x5073('0x13')]('terminal')[_0x5073('0x2b')]; } }); codeMirror[_0x5073('0x34')](); window[_0x5073('0x8')] = _0x1fc91b; $(_0x5073('0x35'))[_0x5073('0x2c')](_0x1fc91b); $(_0x5073('0x35'))['on'](_0x5073('0x36'), function (_0x11259c) { $(this)[_0x5073('0x34')]()[_0x5073('0x37')](); _0x11259c[_0x5073('0x38')](); return ![]; }); clearTerminal(); } function addZero(_0x3590ff) { if (_0x3590ff < 0xa) { _0x3590ff = '0' + _0x3590ff; } return _0x3590ff; } function getDateTime() { var _0x207d4e = new Date(); var _0x5daf2d = _0x207d4e[_0x5073('0x39')]() + '/' + (_0x207d4e[_0x5073('0x3a')]() + 0x1) + '/' + _0x207d4e[_0x5073('0x3b')](); var _0x556533 = addZero(_0x207d4e[_0x5073('0x3c')]()) + ':' + addZero(_0x207d4e[_0x5073('0x3d')]()) + ':' + addZero(_0x207d4e['getSeconds']()); var _0x2bbc9c = _0x5daf2d + '\x20' + _0x556533; return _0x2bbc9c; } function sortFunction(_0x4b126e, _0xf06d9a) { if (_0x4b126e[0x0] === _0xf06d9a[0x0]) { return 0x0; } else { return _0x4b126e[0x0] < _0xf06d9a[0x0] ? -0x1 : 0x1; } } function padListEnabled() { return typeof localStorage !== _0x5073('0x3e') && typeof JSON !== _0x5073('0x3e') && localStorage['setItem'] && localStorage['getItem'] && JSON[_0x5073('0x3f')] && JSON[_0x5073('0x40')]; } function ensurePadInList(_0x252e0f) { if (!padListEnabled()) { return; } var _0x167836 = JSON[_0x5073('0x3f')](localStorage[_0x5073('0x41')](_0x5073('0x42')) || '{\x20}'); if (!(_0x252e0f in _0x167836)) { var _0x5abc19 = new Date(); var _0xa04372 = _0x5abc19[_0x5073('0x39')](), _0xe73a8 = _0x5abc19[_0x5073('0x3a')]() + 0x1, _0x15cea9 = _0x5abc19['getDate'](); var _0x156b1d = _0x5abc19['getHours'](), _0x3d9c75 = _0x5abc19[_0x5073('0x3d')](); if (_0x156b1d < 0xa) { _0x156b1d = '0' + _0x156b1d; } if (_0x3d9c75 < 0xa) { _0x3d9c75 = '0' + _0x3d9c75; } _0x167836[_0x252e0f] = [_0xa04372, _0xe73a8, _0x15cea9][_0x5073('0x43')]('/') + '\x20' + _0x156b1d + ':' + _0x3d9c75; localStorage['setItem']('demo-pad-list', JSON[_0x5073('0x40')](_0x167836)); buildPadList(); } } function buildPadList() { if (!padListEnabled()) { return; } $(_0x5073('0x22'))[_0x5073('0x23')](); if (user) { var _0x4203eb = {}; var _0x8f387a = []; var _0x3fb4eb = firebase[_0x5073('0x9')]()['ref'](_0x5073('0xe'))[_0x5073('0xc')](user[_0x5073('0xd')])['child']('firepadHashes'); _0x3fb4eb[_0x5073('0x17')](_0x5073('0x18'))[_0x5073('0x19')](function (_0x440dc0) { _0x4203eb = _0x440dc0[_0x5073('0x2c')]() || '{}'; for (var _0x399240 in _0x4203eb) { _0x8f387a[_0x5073('0x44')]([_0x4203eb[_0x399240], _0x399240]); } _0x8f387a[_0x5073('0x45')](sortFunction); for (var _0x2a6c8d = 0x0; _0x2a6c8d < _0x8f387a[_0x5073('0x46')]; _0x2a6c8d++) { $(_0x5073('0x22'))[_0x5073('0x47')]($(_0x5073('0x48'))[_0x5073('0x49')](_0x5073('0x4a'))['append'](makePadLink(_0x8f387a[_0x2a6c8d][0x1], _0x8f387a[_0x2a6c8d][0x0]))); } }); } else { var _0x432b99 = {}; _0x432b99 = JSON[_0x5073('0x3f')](localStorage[_0x5073('0x41')](_0x5073('0x42')) || '{\x20}'); $(_0x5073('0x22'))['html'](''); for (var _0x3b9814 in _0x432b99) { $(_0x5073('0x22'))[_0x5073('0x47')]($('<div></div>')[_0x5073('0x49')](_0x5073('0x4a'))[_0x5073('0x2e')](makePadLink(_0x3b9814, _0x432b99[_0x3b9814]))); } } } function makePadLink(_0x260923, _0xedf10c) { return $(_0x5073('0x4b'))[_0x5073('0x49')](_0x5073('0x4c'))[_0x5073('0x4d')](_0x5073('0x4e'), '#')['text'](_0xedf10c)['on'](_0x5073('0x36'), function () { window[_0x5073('0x8')] = window['location'][_0x5073('0x4f')]()[_0x5073('0x7')](/#.*/, '') + '#' + _0x260923; return ![]; }); } function randomString(_0x4734c9) { var _0x52aa9f = ''; var _0x4e6e90 = _0x5073('0x50'); for (var _0x423962 = 0x0; _0x423962 < _0x4734c9; _0x423962++)_0x52aa9f += _0x4e6e90[_0x5073('0x51')](Math[_0x5073('0x52')](Math[_0x5073('0x53')]() * _0x4e6e90[_0x5073('0x46')])); return _0x52aa9f; } function changeTheme() { if ($(_0x5073('0x54'))['is'](':checked')) { codeMirror[_0x5073('0x55')](_0x5073('0x56'), _0x5073('0x57')); } else { codeMirror[_0x5073('0x55')](_0x5073('0x56'), _0x5073('0x15')); } } function clearStorage() { if (user) { firebase['database']()[_0x5073('0xb')](_0x5073('0xe'))[_0x5073('0xc')](user[_0x5073('0xd')])[_0x5073('0xc')](_0x5073('0x11'))[_0x5073('0x5')](); console[_0x5073('0x0')](_0x5073('0x58')); location[_0x5073('0x59')](); } else { localStorage['clear'](); console[_0x5073('0x0')](_0x5073('0x5a')); location[_0x5073('0x59')](); } } function getData() { var _0x392a5e = location['hash'][_0x5073('0x5b')](0x1); var _0x5e80b1 = getDateTime()[_0x5073('0x4f')](); _0x5e80b1 = _0x5e80b1[_0x5073('0x5c')]('\x20')[0x1]; var _0xe651a = firebase[_0x5073('0x9')]()[_0x5073('0xb')](_0x5073('0xa'))[_0x5073('0xc')](_0x392a5e)[_0x5073('0xc')]('output'); const _0x4f3f21 = firebase[_0x5073('0x5d')]()['collection'](_0x5073('0x5e'))[_0x5073('0x5f')](_0x5073('0x60')); if (user) { _0xe651a[_0x5073('0xf')](_0x5e80b1 + '\x20' + user[_0x5073('0x10')] + '\x20ran\x20the\x20code:\x20\x0a'); $['get'](_0x5073('0x61'), { 'id': _0x392a5e }, _0x179558 => { _0x4f3f21[_0x5073('0x62')]({ 'count': firebase[_0x5073('0x5d')][_0x5073('0x63')][_0x5073('0x64')](_0x179558[_0x5073('0x65')]) }); }); } else { _0xe651a[_0x5073('0xf')](_0x5e80b1 + _0x5073('0x66')); $[_0x5073('0x67')](_0x5073('0x61'), { 'id': _0x392a5e }, _0x18bbd6 => { _0x4f3f21['update']({ 'count': firebase['firestore'][_0x5073('0x63')][_0x5073('0x64')](_0x18bbd6[_0x5073('0x65')]) }); }); } }; function lockFirepad() { var _0x3ecc0a = location[_0x5073('0x6')][_0x5073('0x5b')](0x1); firebase[_0x5073('0x9')]()[_0x5073('0xb')](_0x5073('0xa'))[_0x5073('0xc')](_0x3ecc0a)[_0x5073('0x62')]({ 'locked': !![] }); codeMirror[_0x5073('0x55')](_0x5073('0x68'), _0x5073('0x69')); $('#lock-btn')[_0x5073('0x6a')](_0x5073('0x6b'), !![]); } $(function () { $(_0x5073('0x6c'))[_0x5073('0x6d')]({ 'handles': 'e', 'resize': function (_0x181683, _0x377a2b) { var _0x2104d9 = _0x377a2b[_0x5073('0x6e')][_0x5073('0x6f')](); var _0x422d6c = _0x2104d9[_0x5073('0x70')]() - _0x377a2b[_0x5073('0x6e')][_0x5073('0x71')](), _0x309cef = _0x377a2b['element'][_0x5073('0x72')](), _0x13542a = (_0x422d6c - (_0x309cef[_0x5073('0x71')]() - _0x309cef[_0x5073('0x70')]())) / _0x2104d9[_0x5073('0x70')]() * 0x64 + '%'; _0x309cef[_0x5073('0x70')](_0x13542a); }, 'stop': function (_0x3fc9a0, _0x2238ec) { var _0x9573d5 = _0x2238ec[_0x5073('0x6e')][_0x5073('0x6f')](); _0x2238ec['element'][_0x5073('0x73')]({ 'width': _0x2238ec['element'][_0x5073('0x70')]() / _0x9573d5[_0x5073('0x70')]() * 0x64 + '%' }); } }); }); function share() { console[_0x5073('0x0')](); } function clearTerminal() { $(_0x5073('0x2d'))[_0x5073('0x23')](); }