 import that from './../main'
 export default function instance (value,type,title) {
  if(value === 'alert'){
    alert(type,title)
  } else {
    tip(type, title)
  }
}

function tip(type, title){
  switch(type){
    case 'success':
      that.$Message.success(title);
      break;
    case 'warning':
      that.$Message.warning(title);
      break;
    case 'error':
      that.$Message.error(title);
      break;
  }
}

function alert(type,title){
  // const title = '填写学生信息';
  // const content = '<p>Content of dialog</p><p>Content of dialog</p>';
  const content = ''
  switch (type) {
      case 'info':
        that.$Modal.info({
              title: title,
              content: value
          });
          break;
      case 'success':
        that.$Modal.success({
              title: title,
              content: content
          });
          break;
      case 'warning':
        that.$Modal.warning({
              title: title,
              content: content
          });
          break;
      case 'error':
        that.$Modal.error({
              title: title,
              content: content
          });
          break;
  }
}