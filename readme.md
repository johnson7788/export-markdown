基于export-html修改的export-markdown
官方有markdown的输出方法，但是没有保存到文件，所以又写了一个接口data2markdownOfficial
# @mind-elixir/export-markdown

`@mind-elixir/export-markdown` is a plugin of [mind-elixir-core](https://github.com/ssshooter/mind-elixir-core). You can use `@mind-elixir/export-markdown` to export a `.md` file.

## Install

```
npm i @mind-elixir/export-markdown file-saver
```

## How To Use

### Use As A Plugin

```javascript
import MindElixir from 'mind-elixir'
//或者data2markdownOfficial
import exportmarkdown from '@mind-elixir/export-markdown'

const mind = new MindElixir(options)
mind.install(exportmarkdown)
mind.init(data)

const blob = await mind.exportmarkdown() // get blob

mind.exportmarkdownFile(fileName) // download file
```

### MindElixir Data To markdown

```javascript
import { data2markdown } from '@mind-elixir/export-markdown'
// use this way to avoid creating instance
const blob = await data2markdown(JSON.parse(JSON.stringify(data))) // data returned by getData()
```

### Compatibility

```
@mind-elixir/export-markdown@1.0.0 -> mind-elixir 1.x
@mind-elixir/export-markdown@2.0.0 -> mind-elixir 2.x
@mind-elixir/export-markdown@3.0.0 -> mind-elixir 3.x
```
