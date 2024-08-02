import { saveAs } from 'file-saver'

export function data2markdownOfficial(data) {
  //官方interact.ts中的方法
  if (!data.nodeData) {
    console.error('data2markdown: data.nodeData is undefined')
    return
  }
  const nodeData = data.nodeData
  let mdString = '# ' + nodeData.topic + '\n\n'
  function writeMd(children, deep) {
      for (let i = 0; i < children.length; i++) {
        if (deep <= 6) {
          mdString += ''.padStart(deep, '#') + ' ' + children[i].topic + '\n\n'
        } else {
          mdString += ''.padStart(deep - 7, '\t') + '- ' + children[i].topic + '\n'
        }
        if (children[i].children) {
          writeMd(children[i].children || [], deep + 1)
        }
      }
    }
    writeMd(nodeData.children || [], 2)
  return new Blob([mdString], { type: 'text/markdown' }); // 将字符串放入数组中，并指定 MIME 类型
}

export function data2markdown(data) {
  // 自己写的方法
  if (!data.nodeData) {
    console.error('data2markdown: data.nodeData is undefined')
    return
  }
  const markdown_data = generateMarkdown(data.nodeData)
  return new Blob([markdown_data], { type: 'text/markdown' }); // 将字符串放入数组中，并指定 MIME 类型
}


function generateMarkdown(node, level = 1) {
  let md = `${'#'.repeat(level)} ${node.topic}\n\n`;

  if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
          md += generateMarkdown(child, level + 1);
      });
  }
  return md;
}

export default function (me) {
  me.exportMarkdown = function () {
    const data = me.getData()
    return data2markdown(data)
  }
  me.exportMarkdownFile = function (fileName) {
    const data = me.getData()
    const file = data2markdown(data)
    saveAs(file, (fileName || data.nodeData.topic))
  }
}
