const chalk = require('chalk');
const shell = require('shelljs');
const inquirer = require('inquirer');

handleBuild();

async function handleBuild() {
  try {
    shell.echo(chalk.green('拉取远程代码'));
    shell.exec('git pull');
    shell.echo(chalk.green('下载依赖包'));
    shell.exec('npm install');

    // 创建tag版本
    await handleCreateTag();

    shell.echo(chalk.green('开始打包'));
    shell.exec('npm run build');
    shell.echo(chalk.green('项目打包完成'));
    // 下载依赖包时候，可能会造成 package-lock.json 的改动，导致无法切换分支
    shell.exec('git checkout .');
    shell.exec('git checkout master');

    shell.echo(chalk.green('开始配置 Nginx'));
    shell.exec('rm -rf /usr/local/nginx/html/*');
    shell.exec('mv ./dist/* /usr/local/nginx/html');
    shell.exec('nginx -s reload');
    shell.echo(chalk.green('项目构建完成'));
    shell.echo(chalk.green('https://www.zihao.work'));
    shell.exit();
  } catch (error) {
    console.error(error);
    shell.exit(1);
  }
}

/**
 * 创建版本号
 */
async function handleCreateTag() {
  const lastTag = shell.exec('git tag | tail -1', { silent: true }).stdout.replace(/\s+|\|\n|\*/g, '');

  const answer = await inquirer.prompt([
    {
      name: 'tag',
      type: 'input',
      message: `请输入版本号，当前最新的版本号为: ${chalk.green(lastTag)}`,
    },
  ]);

  if (!answer.tag) {
    throw new Error('请输入版本号');
  }

  /**
   * v1.0.0
   * v1.0.1
   */
  if (!/^v[0-9]\.[0-9]\.[0-9]/.test(answer.tag)) {
    throw new Error('版本号不符合规范');
  }

  shell.exec(`git tag ${answer.tag}`);
  shell.exec(`git push origin ${answer.tag}`);
  shell.exec(`git checkout ${answer.tag}`);
}
