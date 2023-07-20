/** 完美计时器
 * 不能保证绝对完美，在刚开始运行时可能不稳定，但是随着时间的推移，误差会越来越小
 *
 * @param {function} callback
 * @param {number} interval
 */
function perfectInterval(callback, interval) {
  const start = performance.now();
  let times = 0;
  function loop(now) {
    callback();
    times++;
    const gap = times * interval - (now - start);
    console.log(now - start, gap);
    setTimeout(() => {
      requestAnimationFrame(loop);
    }, gap);
  }
  loop(start);
}
