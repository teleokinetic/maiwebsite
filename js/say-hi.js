(function () {
  function bindHi(root) {
    var links = (root || document).querySelectorAll('a.say-hi, a[data-email]');
    links.forEach(function (a) {
      if (a.__hiBound) return;
      a.__hiBound = true;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var email = a.getAttribute('data-email') || 'tannerholman97@gmail.com';
        var showToast = function (msg) {
          var toast =
            (a.closest('.site-footer') && a.closest('.site-footer').querySelector('.hi-toast')) ||
            document.querySelector('.hi-toast');
          if (!toast) return;
          toast.textContent = msg;
          toast.classList.add('visible');
          clearTimeout(toast.__t);
          toast.__t = setTimeout(function () { toast.classList.remove('visible'); }, 2400);
        };
        var fallback = function () {
          var ta = document.createElement('textarea');
          ta.value = email; ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); showToast('✓ ' + email + ' copied — paste it into your mail app'); }
          catch (_) { showToast(email); window.location.href = 'mailto:' + email; }
          document.body.removeChild(ta);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(function () {
            showToast('✓ ' + email + ' copied — paste it into your mail app');
          }).catch(fallback);
        } else {
          fallback();
        }
      });
    });
  }
  bindHi(document);
})();
