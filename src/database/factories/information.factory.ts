import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Information } from '../entities/information.entity';

const urls = [
  'https://mponline.sbi-moneyplaza.co.jp/money/education/20210825kodomo-hitsuyouhiyou.html',
  'https://www.rere.jp/beginners/37318/',
  'https://www.taiju-life.co.jp/joyful/simu03/index.php',
  'https://www.suntory-kenko.com/column/article/07/',
  'https://bestjuku.com/article/3874',
  'https://www.o-uccino.jp/article/posts/56886',
  'https://www.o-uccino.jp/article/posts/79152',
  'https://www.rakuten-life.co.jp/event/necessary/',
  'https://www.nta.co.jp/media/tripa/articles/SfrDL',
  'https://izo-kifu.jp/yuigonsyo/flow/?gclid=CjwKCAiAjoeRBhAJEiwAYY3nDDCW_n-9EQcZy0Z2Xi5Y_XVbl4p9l-54jeZdDMawds00UXYfeGyQIRoC3dIQAvD_BwE',
];

const title = [
  '子供の学費はいくら必要？ 大学卒業までの費用の平均と貯め方',
  '趣味の見つけ方マニュアル｜インドア・アウトドア別60種の趣味をご紹介！',
  'これからの人生を楽しむ！目指せ健康長寿！長生き診断！',
  '栄養バランスの良い食事とは？健康維持のための食事について解説',
  '【中学生】塾にかかる費用を「料金表」で分かりやすく解説します！',
  '【最新版】お金持ち1000人の「本当に効いた！節約術ランキング」ベスト15発表',
  '趣味がない人必見！「1人でも楽しい」「友達が増える」おすすめ趣味一覧35選',
  '保険って本当にひつようなの？',
  '小旅行におすすめ！三連休に行ける国内のおすすめ旅行スポット15選',
  '遺言書の作成手順',
];

const content = [
  '子供にかかるお金は、人生の3大資金の1つとされているほど大きな支出となります。子供にはさまざまな費用がかかりますが、中でも学費は避けることができません。負担は大きくとも親の気持ちとしても安易に節約したいとは思わないはずですし,一度よく考えてみましょう',
  '今回は、自分の個性に合わせた趣味の見つけ方について、わかりやすくマニュアル化してみようと思います。「どうやって趣味を見つければいいのかわからない」「そもそも、趣味にはどんなものがあるのか幅広く知りたい」という人の参考になれば幸いです',
  '日本人の平均寿命は年々伸びており、1960年代には男性が60代後半、女性が70代前半だったものが、2012年には男性が79.94歳、女性が86.41歳となっています。 長生きは喜ばしいことですが、「長生きするリスク」というものを忘れてはいけません。定年退職後の20年以上を楽しく過ごすためにも、生活費やいざというときの備えについて考えておきたいものです。',
  '毎日当たり前のようにとっている食事は、体に栄養を与えるという非常に重要な役割を果たしています。ただし、そのためにはバランスが大切です。好きなものだけを食べ続けたり、一度に大量に食べたりすると栄養が偏って体を壊すことにもなりかねません。そこで、この記事では、栄養バランスが良い食事とは具体的にどのようなものかについて解説をしていきます。',
  '中学校に進学すると勉強内容が難しくなることから、学習塾に通いはじめる中学生は少なくありません。一口に学習塾といっても巷にはたくさんあり、それぞれで料金体系や費用が異なります。多くの家庭にとって塾費用は塾選びで大切な判断材料の一つ。そこで、今回は中学生向け大手学習塾の費用について、料金表を用いて分かりやすく解説。費用を抑える方法や塾選びのポイントも一緒に紹介するので、参考にしてください！',
  'お金を貯めている人たちがこぞって「費用対効果が高かった！」と証言する、一押しの節約術だけを発表します。無理や我慢を重ねる「ハードな節約」をしなくても、この中から「自分に合った節約術だけ」を選んでマネすれば、気づけば自然とお金が貯まる、お金に愛される人に生まれ変わるはず。',
  '休みだけどやる事がない、趣味がないと悩んでいる方も多いのではないでしょうか。実は趣味がない人は多く、自分だけが取り残されていると思う必要はありません。そこで今回は、今からでもはじめやすい、おすすめの趣味を紹介していきます。趣味は出会いがあったり、ストレスが解消できたりとメリットも多いので自分に合った趣味を見つけてみてくださいね。',
  '保険には公的な保険と、それ以外の任意の保険があります。公的な保険（健康保険、公的年金保険、雇用保険、労災保険、自賠責保険など）は、加入条件に合致した場合に強制加入となるものが多いので、必要か不要かではなく、きちんと入っていることを前提とすれば、これを除いた、「任意の保険」には一切入らなくても大丈夫というお考えの方もいらっしゃいます。',
  'せっかくの三連休を無駄に過ごしたくないと思っている方におすすめしたい、国内の旅行先をご紹介します。三連休の小旅行にもぴったりなアクセスのよい場所は、日本国内にたくさんあります。その中から特におすすめのスポットを厳選しました。ぜひ旅の計画にお役立てください！',
  'いつ死ぬかは誰にもわかりません。生きているうちに遺書の準備をしましょう！あなたが生涯をかけて築き、守ってきた財産を書き出すことから遺言書作成は始まります。',
];

const genre = ['学費', '趣味', '健康', '健康', '学費', '節約', '趣味', '保険', '旅行', '遺書'];

let count = 0;

define(Information, (faker: typeof Faker) => {
  const information = new Information();
  information.content = content[count];
  information.url = urls[count];
  information.title = title[count];
  information.genre = genre[count];

  count += 1;

  return information;
});
