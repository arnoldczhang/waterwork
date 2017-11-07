$(function () {
  var userName = $("#username");
  var passWord = $("#password");
  var noLoginSection = $("#noLoginSection");
  var loginSection = $("#loginSection");
  var content = $("#content");
  var template = $("#template");
  var code = $("#code");
  var $codeContent = $("#code-content");
  var $fakeinput = $("#fakeinput");
  var codeContent = $codeContent.get(0);

  // 登录-start
  $('#loginBtn').on('click', function (e) {
    $.post('/login', {
      name: userName.val(),
      password: passWord.val(),
    }, function (res) {
      if (res.code !== 0) {
        alert(res.message);
      }

      else {
        noLoginSection.hide();
        content.html('<p id="loginSection">欢迎，' + userName.val() + '</p>');
      }
    });
  });

  $('#code').on('keydown', function (e) {
    var keyCode = e.keyCode || e.which || e.charCode;
    var ctrlKey = e.ctrlKey || e.metaKey;
    if(ctrlKey && keyCode == 83) {
      e.preventDefault();
      $('#submit').trigger('click');
    }
  });

  $('#submit').on('click', function (e) {
    $.post('/save', {
      id: 'test',
      content: code.val(),
    }, function (res) {
      if (res.code !== 0) {
        alert(res.message);
      }

      else {
        var script = document.createElement('script');
        var body = template.get(0).contentDocument.body;
        var child;
        script.type = 'text/javascript';
        if (script.innerHTML !== res.data) {
          script.innerHTML = res.data;
          script.id = 'test';
          if (child || (child = body.querySelector('#test'))) {
            body.replaceChild(script, child);
            child = script;
          }

          else {
            body.appendChild(script);
          }
        }
      }
    });
  });
  // 登录-end




  var editing = false;
  var editingBox = null;
  var currentEl = null;
  var IMEinput = false;
  var currentVal = '';
  var currentLine;

  function getLineStr (data) {
    return `
      <div class="code-line">
        <span class="code-part">${data}</span>
      </div>
    `;
  };

  function getPartStr (data) {
    return `
      <span class="code-part">${data}</span>
    `;
  };

  $('#code-content').on('click', function (e) {
    editing = true;
    $('.code-cursor').css('display', 'inline-block');
  })

  $(document.body).on('click', function (e) {
    currentEl = e.target;
    editing = codeContent.contains(currentEl);
    $('.code-cursor').css('display', editing || currentEl === codeContent ? 'inline-block' : 'none');
  }).on('keypress', function (e) {
    var keyCode = e.keyCode || e.which || e.charCode;
    if (editing && keyCode >= 34) {
      $fakeinput.trigger('focus');
      if (currentEl !== codeContent) {
        currentEl = currentEl.classList.contains('code-line') ? currentEl.lastElementChild : currentEl;
        currentEl.textContent += String.fromCharCode(keyCode);
      }

      else {
        var $codeLine = $(getLineStr(String.fromCharCode(keyCode)));
        currentEl = $codeLine.get(0).querySelector('span');
        currentLine = $codeLine;
        $codeContent.append($codeLine);
      }
    }
  }).on('keydown', function (e) {
    if (!editing) return;
    var keyCode = e.keyCode || e.which || e.charCode;

    // Backspace
    if (keyCode === 8) {
      e.preventDefault();
      if (currentEl) {
        var len = currentEl.textContent.length;
        if (!len) {
          codeContent.removeChild(currentEl.parentNode);
          currentEl = codeContent.lastElementChild.lastElementChild;
        }

        else {
          currentEl.textContent = currentEl.textContent.substr(0, len - 1);
        }
      }
    }

    // Space
    if (keyCode === 32) {
      e.preventDefault();
      if (/^\s+$/.test(currentEl.textContent)) {
        console.log(currentEl.innerHTML);
        currentEl.innerHTML += '&nbsp;';
      }

      else {
        currentEl = $(getPartStr('&nbsp;'));
        currentLine.append(currentEl);
        currentEl = currentEl.get(0);
      }
    }

    // Enter
    if (keyCode === 13) {
      var codeLine = $(getLineStr(''));
      currentEl = codeLine.get(0).querySelector('span');
      $codeContent.append(codeLine);
    }
  });
  
  $fakeinput.on('keyup keydown keypress', function (e) {
    if (!IMEinput) e.target.value = '';
  }).on('keyup', function (e) {
    if (IMEinput) {
      currentEl.textContent = currentVal + e.target.value;
    }
  }).on('compositionstart', function (e) {
    e.target.value = '';
    IMEinput = true;
    currentVal = currentEl.textContent;
    console.log('compositionstart');
  }).on('compositionupdate', function (e) {
    var keyCode = e.keyCode || e.which || e.charCode;
  }).on('compositionend', function (e) {
    IMEinput = false;
    currentEl.textContent = currentVal + e.target.value;
  });
});