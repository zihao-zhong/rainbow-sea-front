const chalk = require('chalk');
const shell = require('shelljs');
const inquirer = require('inquirer');

handleBuild();

async function handleBuild() {
  const lastTag = handleGetLastTag();
  const oldTag = lastTag.replace(/v/, '');

  try {
    shell.echo(chalk.green('拉取远程代码'));
    shell.exec('git checkout .');
    shell.exec('git checkout master');
    shell.exec('git pull');

    // 创建tag版本
    const newTag = await handleCreateTag();

    shell.echo(chalk.green(`旧TAG: ${lastTag} 新TAG: v${newTag}`));

    // docker 构建
    shell.echo(chalk.green('Docker 开始打包构建项目...'));
    shell.exec(`docker build -t rainbow_sea_front:${newTag} .`);
    shell.echo(chalk.green('项目打包完成'));

    shell.echo(chalk.green('停止旧容器，用新镜像重新跑一个容器'));
    shell.exec(`docker stop rainbow_sea_front_${oldTag}`);
    shell.exec(`docker run --name rainbow_sea_front_${newTag} -p 80:80 -d rainbow_sea_front:${newTag}`);

    shell.echo(chalk.green('项目部署成功，访问地址: http://116.205.186.172'));
    shell.exit();
  } catch (error) {
    shell.echo(chalk.red('构建过程发生错误，重新启动旧容器'));
    shell.exec(`docker start rainbow_sea_front_${oldTag}`);
    console.error(error);
    shell.exit(1);
  }
}

/**
 * 获取最后版本的tag
 */
function handleGetLastTag() {
  const lastTag = shell.exec('git tag | tail -1', { silent: true }).stdout.replace(/\s+|\|\n|\*/g, '');
  return lastTag;
}

/**
 * 创建版本号
 */
async function handleCreateTag() {
  const lastTag = handleGetLastTag();

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

  return answer.tag.replace(/v/, '');
}
