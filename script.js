(() => {
  const statusEl = document.getElementById('status');
  const bar = document.createElement('progress');
  bar.id = 'status-progress';
  bar.hidden = true;
  statusEl.after(bar);

  // สถานะข้อมูลออฟไลน์ที่ได้จาก service worker: {type: 'progress'|'ready'|'error', done, total}
  let cacheState = null;

  function updateStatus() {
    const online = navigator.onLine;
    let text;
    bar.hidden = true;

    if (!('serviceWorker' in navigator)) {
      text = online ? 'preta!' : '⚠ senrete · ออฟไลน์ (เบราว์เซอร์นี้ไม่รองรับการใช้ออฟไลน์)';
    } else if (!cacheState) {
      text = online ? 'preta! · กำลังตรวจข้อมูลออฟไลน์…' : 'senrete · ออฟไลน์';
    } else if (cacheState.type === 'progress') {
      const mb = ((cacheState.bytes || 0) / 1048576).toFixed(1);
      text = `⬇ elŝutas ${mb} MB · กำลังดาวน์โหลดข้อมูลเพื่อใช้ออฟไลน์ (${cacheState.done}/${cacheState.total} ไฟล์)`;
      // ไม่รู้ขนาดรวมล่วงหน้า จึงใช้แถบแบบไม่ระบุค่า (เคลื่อนไหวไปเรื่อยๆ)
      bar.removeAttribute('value');
      bar.hidden = false;
    } else if (cacheState.type === 'ready') {
      text = online ? '✓ preta · พร้อมใช้งานออฟไลน์' : '✓ senrete serĉebla · ออฟไลน์ ค้นหาได้';
    } else {
      text = online
        ? '⚠ elŝuto malsukcesis · ดาวน์โหลดข้อมูลออฟไลน์ไม่สำเร็จ จะลองใหม่เมื่อเปิดครั้งถัดไป'
        : '⚠ senrete · ออฟไลน์ ข้อมูลยังดาวน์โหลดไม่ครบ';
    }
    statusEl.textContent = text;
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
      const msg = event.data;
      if (!msg || !['progress', 'ready', 'error'].includes(msg.type)) return;
      cacheState = msg;
      updateStatus();
    });

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => {
          // ถ้ามี SW ทำงานอยู่แล้ว ให้ถามว่าข้อมูลใน cache ครบหรือยัง
          if (reg.active) reg.active.postMessage({ type: 'status' });
        })
        .catch(err => {
          console.error('SW failed', err);
          cacheState = { type: 'error' };
          updateStatus();
        });
    });
  }

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();
})();
