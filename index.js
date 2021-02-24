var that
class Tab {
  constructor(id) {
    that = this
    this.main = document.getElementById(id)
    this.add = this.main.querySelector('.add')
    this.ul = this.main.querySelector('.list ul:first-child')
    this.section = this.main.querySelector('.view')
    this.init()
  }
  init () {
    this.updataNode()
    this.add.onclick = this.addTab
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i
      this.lis[i].onclick = this.toggeTab
      this.remove[i].onclick = this.removeTab
      this.spans[i].ondblclick = this.editTab
    }
  }
  //获取所有小li和section
  updataNode () {
    this.lis = this.main.querySelectorAll('li')
    this.sections = this.main.querySelectorAll('section')
    this.remove = this.main.querySelectorAll('.remove')
    this.spans = this.main.querySelectorAll('.list li span:last-child')
  }
  //1.切换功能
  toggeTab () {
    that.clearClass()
    this.className = 'activelis'
    that.sections[this.index].className = 'active'
  }
  //清除所有函数
  clearClass () {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ''
      this.sections[i].className = ''
    }
  }
  //2.添加功能
  addTab () {
    that.clearClass()
    let li = `<li class="activelis"> <span class="remove">x</span><span>新</span></li>`
    let section = ` <section class="active">测试一</section>`
    that.ul.insertAdjacentHTML('beforeend', li)
    that.section.insertAdjacentHTML('beforeend', section)
    that.init()
  }
  //3.删除功能
  removeTab (e) {
    e.stopPropagation() //阻止冒泡
    let index = this.parentNode.index
    that.lis[index].remove()
    that.sections[index].remove()
    that.init()
    if (document.querySelector('.activelis')) return
    index--
    // 手动调用我们的点击事件，不需要鼠标触发
    that.lis[index] && that.lis[index].click()

  }
  // 4.修改功能
  editTab () {
    let str = this.innerHTML
    this.innerHTML = `<input   type='text'/>`
    let input = this.children[0]
    input.value = str
    input.select()
    input.onblur = function () {
      this.parentNode.innerHTML = this.value
    }
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
        this.blur()
      }
    }
  }
}

new Tab('box')