import { saveAs } from 'file-saver'

export function data2markdown(data) {
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
