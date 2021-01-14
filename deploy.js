const path = require('path');
const spawn = require('cross-spawn');
const CLI = require('clui');
const simpleGit = require('simple-git');

const Spinner = CLI.Spinner;

const ora = require('ora');

async function deploy() {
  // const args = process.argv;
  // const envArg = args.find((item) => item.indexOf('env=') === 0);
  // const env = envArg ? envArg.split('=')[1] : envArg;
  // const buildArg = env ? `:${env}` : '';
  ora('部署开始...').info();
  spawn.sync('yarn', ['build'], { stdio: 'inherit' });
  ora('build 完成').info();
  const status = new Spinner('初始化git...');
  status.start();
  const git = simpleGit({
    baseDir: path.resolve(__dirname, 'dist'),
    binary: 'git',
  });
  try {
    await git
      .init()
      .checkoutLocalBranch('dev')
      .add('./*')
      .commit('auto commit')
      .addRemote(
        'origin',
        'http://gitlab.apps.test.datadrivecloud.com/hackthon/front.git',
      )
      .push(['origin', 'dev', '--force']);
    status.stop();
    ora('build push完成..').info();
  } catch (err) {
    console.log(err.toString());
    status.stop();
  }
}

deploy();
