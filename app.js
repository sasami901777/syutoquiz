// app.js
const heritageImage = document.getElementById('heritage-image');
const questionText = document.getElementById('question-text');
const choicesArea = document.getElementById('choices-area');
const feedbackMessage = document.getElementById('feedback-message');
const explanationArea = document.getElementById('explanation-area');
const heritageName = document.getElementById('heritage-name');
const heritageDescription = document.getElementById('heritage-description');
const nextButton = document.getElementById('next-question');

// 世界遺産のデータ（サンプル）
// 実際のアプリでは、より多くのデータや外部APIからの取得を検討してください。
// 画像URLは、ご自身で用意するか、フリー素材サイトなどから取得してください。
const worldHeritageData = [
    {
        name: "万里の長城",
        country: "中国",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/640px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
        description: "紀元前から建設が始まり、歴代王朝によって増改築が繰り返された巨大な城壁。異民族の侵入を防ぐために築かれました。"
    },
    {
        name: "コロッセオ",
        country: "イタリア",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/640px-Colosseo_2020.jpg",
        description: "古代ローマ時代に建設された円形闘技場。剣闘士の試合や公開処刑などが行われ、ローマ帝国の威厳を象徴しています。"
    },
    {
        name: "タージ・マハル",
        country: "インド",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_-_Diliff.jpg/640px-Taj_Mahal%2C_Agra%2C_India_-_Diliff.jpg",
        description: "ムガル帝国第5代皇帝シャー・ジャハーンが、愛妃ムムターズ・マハルのために建設した白亜の霊廟。イスラム建築の最高傑作と評されます。"
    },
    {
        name: "マチュ・ピチュの歴史保護区",
        country: "ペルー",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/640px-Machu_Picchu%2C_Peru.jpg",
        description: "インカ帝国の空中都市として知られる遺跡。アンデス山脈の標高2,430mの尾根に位置し、その建築技術と景観は世界を魅了します。"
    },
    {
        name: "ギザのピラミッド",
        country: "エジプト",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/640px-All_Gizah_Pyramids.jpg",
        description: "古代エジプトのファラオの墓として建設された巨大な石造建築物。クフ王のピラミッドは、古代世界の七不思議の一つです。"
    },
    {
        name: "自由の女神像",
        country: "アメリカ合衆国",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Statue_of_Liberty_7.jpg/640px-Statue_of_Liberty_7.jpg",
        description: "アメリカ合衆国の独立100周年を記念してフランスから贈られた像。自由と民主主義の象徴として知られています。"
    },
    {
        name: "ストーンヘンジ",
        country: "イギリス",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Stonehenge_from_the_north.jpg/640px-Stonehenge_from_the_north.jpg",
        description: "新石器時代から青銅器時代にかけて建設された巨大な石の建造物。その目的はいまだ謎に包まれていますが、古代の天文観測所や儀式場であったと考えられています。"
    },
    {
        name: "グランド・キャニオン国立公園",
        country: "アメリカ合衆国",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Grand_Canyon_from_Mather_Point.jpg/640px-Grand_Canyon_from_Mather_Point.jpg",
        description: "コロラド高原を流れるコロラド川が形成した、雄大な渓谷。地球の歴史を物語る地層が露出しており、その壮大な景観は世界中の人々を魅了します。"
    },
    {
        name: "アクロポリス",
        country: "ギリシャ",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Parthenon_from_Propylaea.jpg/640px-Parthenon_from_Propylaea.jpg",
        description: "アテネの中心部にある小高い丘で、古代ギリシャの代表的な建築物であるパルテノン神殿などが建ち並びます。民主主義発祥の地としても知られています。"
    },
    {
        name: "シュリー・ランガナータスワーミ寺院", // インドの代表的な寺院
        country: "インド",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Sri_Ranganathaswamy_Temple_Gopuram.jpg/640px-Sri_Ranganathaswamy_Temple_Gopuram.jpg",
        description: "インド最大のヒンドゥー教寺院複合体の一つで、その壮大なゴープラム（塔門）と美しい彫刻で知られています。南インドの建築様式を代表する存在です。"
    },
    {
        name: "ケルン大聖堂",
        country: "ドイツ",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Cologne_Cathedral_from_the_Rhine.jpg/640px-Cologne_Cathedral_from_the_Rhine.jpg",
        description: "ドイツのケルンにあるゴシック様式の大聖堂。その壮麗な建築と、聖遺物を納めるために建設された歴史的背景を持つ、ドイツを代表する建築物です。"
    },
    {
        name: "モン・サン＝ミシェルとその湾",
        country: "フランス",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Mont_Saint-Michel_at_dawn.jpg/640px-Mont_Saint-Michel_at_dawn.jpg",
        description: "フランス北西部の海岸に浮かぶ岩山に築かれた修道院。潮の満ち引きによって陸と隔絶される神秘的な景観は、「西洋の驚異」と称されます。"
    },
    {
        name: "シドニー・オペラハウス",
        country: "オーストラリア",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Sydney_Opera_House_-_Dec_2008.jpg/640px-Sydney_Opera_House_-_Dec_2008.jpg",
        description: "シドニーの象徴的な建造物であり、20世紀を代表する建築物の一つ。貝殻のような独特の屋根が特徴で、世界的に有名なコンサートホールです。"
    },
    {
        name: "古都京都の文化財",
        country: "日本",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Kinkaku-ji_in_Kyoto.jpg/640px-Kinkaku-ji_in_Kyoto.jpg",
        description: "古くから日本の首都として栄えた京都には、金閣寺や清水寺など、数多くの歴史的建造物や庭園が残されています。日本の伝統文化の粋を集めた場所です。"
    },
    {
        name: "ポンペイ、エルコラーノおよびトッレ・アヌンツィアータの考古地域",
        country: "イタリア",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Pompeii_Forum_Vesuvius.jpg/640px-Pompeii_Forum_Vesuvius.jpg",
        description: "西暦79年のヴェスヴィオ火山噴火によって埋没した古代都市ポンペイ。当時のローマ帝国の生活様式がそのまま保存されており、貴重な考古学的資料となっています。"
    },
    {
        name: "イグアス国立公園",
        country: "ブラジル",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Iguazu_Falls_from_Brazil_side.jpg/640px-Iguazu_Falls_from_Brazil_side.jpg",
        description: "アルゼンチンとの国境に位置する世界最大級の滝、イグアスの滝を中心とした国立公園。その圧倒的な水量と雄大な自然は圧巻です。"
    },
    {
        name: "アブ・シンベルからフィラエまでのヌビア遺跡群",
        country: "エジプト",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Abu_Simbel_Temple_Egypt.jpg/640px-Abu_Simbel_Temple_Egypt.jpg",
        description: "ナイル川沿いに点在する古代エジプトの壮大な岩窟神殿群。アスワン・ハイ・ダム建設時に水没の危機に瀕したが、国際的な協力によって移築・保存されました。"
    }
    {
        name: "シュリー・ランガナータスワーミ寺院", // インドの代表的な寺院
        country: "インド",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Sri_Ranganathaswamy_Temple_Gopuram.jpg/640px-Sri_Ranganathaswamy_Temple_Gopuram.jpg",
        description: "インド最大のヒンドゥー教寺院複合体の一つで、その壮大なゴープラム（塔門）と美しい彫刻で知られています。南インドの建築様式を代表する存在です。"
    },
    {
        name: "ケルン大聖堂",
        country: "ドイツ",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Cologne_Cathedral_from_the_Rhine.jpg/640px-Cologne_Cathedral_from_the_Rhine.jpg",
        description: "ドイツのケルンにあるゴシック様式の大聖堂。その壮麗な建築と、聖遺物を納めるために建設された歴史的背景を持つ、ドイツを代表する建築物です。"
    },
    {
        name: "ポンペイ、エルコラーノおよびトッレ・アヌンツィアータの考古地域",
        country: "イタリア",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Pompeii_Forum_Vesuvius.jpg/640px-Pompeii_Forum_Vesuvius.jpg",
        description: "西暦79年のヴェスヴィオ火山噴火によって埋没した古代都市ポンペイ。当時のローマ帝国の生活様式がそのまま保存されており、貴重な考古学的資料となっています。"
    },
    {
        name: "イグアス国立公園",
        country: "ブラジル",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Iguazu_Falls_from_Brazil_side.jpg/640px-Iguazu_Falls_from_Brazil_side.jpg",
        description: "アルゼンチンとの国境に位置する世界最大級の滝、イグアスの滝を中心とした国立公園。その圧倒的な水量と雄大な自然は圧巻です。"
    },
    {
        name: "アブ・シンベルからフィラエまでのヌビア遺跡群",
        country: "エジプト",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Abu_Simbel_Temple_Egypt.jpg/640px-Abu_Simbel_Temple_Egypt.jpg",
        description: "ナイル川沿いに点在する古代エジプトの壮大な岩窟神殿群。アスワン・ハイ・ダム建設時に水没の危機に瀕したが、国際的な協力によって移築・保存されました。"
    },
    {
        name: "富士山-信仰の対象と芸術の源泉",
        country: "日本",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mount_Fuji_from_Lake_Kawaguchiko%2C_Yamanashi_Prefecture%2C_Japan.jpg/640px-Mount_Fuji_from_Lake_Kawaguchiko%2C_Yamanashi_Prefecture%2C_Japan.jpg",
        description: "日本最高峰の山であり、古くから信仰の対象とされ、多くの芸術作品の題材となってきました。その美しい姿は日本の象徴とされています。"
    },
    {
        name: "エッフェル塔", // エッフェル塔自体は世界遺産ではないが、パリのセーヌ河岸の一部として登録
        country: "フランス",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Eiffel_Tower_from_Champs_de_Mars%2C_Paris%2C_France.jpg/640px-Eiffel_Tower_from_Champs_de_Mars%2C_Paris%2C_France.jpg",
        description: "パリの象徴であり、1889年のパリ万国博覧会のために建設された鉄骨構造の塔。セーヌ河岸の世界遺産の一部です。"
    },
    {
        name: "サグラダ・ファミリア", // 正式名称は「アントニ・ガウディの作品群」の一部
        country: "スペイン",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Sagrada_Familia_from_the_south_2019_01.jpg/640px-Sagrada_Familia_from_the_south_2019_01.jpg",
        description: "アントニ・ガウディが設計した未完の教会。独特の建築様式と壮大なスケールで知られ、バルセロナの象徴です。"
    },
    {
        name: "ヴェネツィアとその潟",
        country: "イタリア",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Venice_-_Grand_Canal_and_San_Giorgio_Maggiore.jpg/640px-Venice_-_Grand_Canal_and_San_Giorgio_Maggiore.jpg",
        description: "運河と橋で結ばれた美しい水の都。独自の歴史と文化、芸術が息づく都市景観は世界中の人々を魅了します。"
    },
    {
        name: "イースター島のラパ・ヌイ国立公園",
        country: "チリ",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Moai_Rano_Raraku.jpg/640px-Moai_Rano_Raraku.jpg",
        description: "太平洋に浮かぶ孤島に点在する巨大な石像「モアイ」で知られる国立公園。その起源や建造方法は未だ多くの謎に包まれています。"
    }
        
    // さらに多くの世界遺産を追加してください
];

const QUIZ_LIMIT = 5; // 出題数
let currentQuestionCount = 0; // 現在の出題数
let availableHeritageIndices = []; // 出題可能な世界遺産のインデックスリスト
let currentHeritage = null; // 現在の問題の世界遺産

// クイズを初期化する（新しいゲームを開始する）
function initializeQuiz() {
    currentQuestionCount = 0;
    // 全ての世界遺産のインデックスをリストに格納し、シャッフルする
    availableHeritageIndices = Array.from({ length: worldHeritageData.length }, (_, i) => i);
    shuffleArray(availableHeritageIndices);
    generateQuestion();
}

// 配列をシャッフルするユーティリティ関数（Fisher-Yatesアルゴリズム）
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 要素を交換
    }
}

// ランダムな世界遺産を1つ選ぶ（ただし、出題済みのものは除く）
function getNextHeritage() {
    if (availableHeritageIndices.length === 0) {
        // 全ての世界遺産が出題された場合、再度シャッフルするか、エラーとする
        // 今回はシンプルに、出題データが足りない場合はエラー表示
        console.warn("利用可能な世界遺産データが不足しています。");
        return null;
    }
    const nextIndex = availableHeritageIndices.pop(); // シャッフルされたリストから取り出す
    return worldHeritageData[nextIndex];
}

// 国名の選択肢を生成するヘルパー関数
function generateCountryChoices(correctCountry) {
    let choices = [correctCountry];
    // 正しい国以外の選択肢を3つ追加
    while (choices.length < 4) {
        const randomHeritage = getRandomHeritage(); // これはworldHeritageDataからランダムに選ぶ
        const choiceToAdd = randomHeritage.country;
        // 重複を避ける
        if (!choices.includes(choiceToAdd)) {
            choices.push(choiceToAdd);
        }
    }
    // 選択肢をシャッフル
    choices.sort(() => Math.random() - 0.5);
    return choices;
}

// 新しい問題を生成する
function generateQuestion() {
    // 10問出題済みかチェック
    if (currentQuestionCount >= QUIZ_LIMIT) {
        endQuiz();
        return;
    }

    currentQuestionCount++; // 出題数をインクリメント

    feedbackMessage.textContent = ''; // フィードバックメッセージをクリア
    feedbackMessage.className = ''; // クラスもクリア
    choicesArea.innerHTML = ''; // 選択肢をクリア
    explanationArea.style.display = 'none'; // 解説エリアを隠す
    nextButton.style.display = 'none'; // 次の質問ボタンを隠す

    currentHeritage = getNextHeritage(); // 次の世界遺産を取得
    if (!currentHeritage) {
        questionText.textContent = '問題の生成に失敗しました。データが不足している可能性があります。';
        return;
    }

    // 現在の出題数を表示
    questionText.textContent = `第 ${currentQuestionCount} 問: この世界遺産がある国はどこ？`;
    heritageImage.src = currentHeritage.imageUrl;
    heritageImage.alt = currentHeritage.name; // alt属性も設定

    const choices = generateCountryChoices(currentHeritage.country);

    // 選択肢ボタンを生成して追加
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-button');
        button.addEventListener('click', () => checkAnswer(choice, currentHeritage.country, button));
        choicesArea.appendChild(button);
    });
}

// 解答をチェックする
function checkAnswer(selectedAnswer, correctAnswer, clickedButton) {
    // 全てのボタンを無効化
    Array.from(choicesArea.children).forEach(button => {
        button.disabled = true;
        // 正解のボタンを緑色にする
        if (button.textContent === correctAnswer) {
            button.classList.add('correct-answer');
        }
    });

    if (selectedAnswer === correctAnswer) {
        feedbackMessage.textContent = '🎉 正解です！素晴らしい！';
        feedbackMessage.classList.add('correct');
        clickedButton.classList.add('correct-answer');
    } else {
        feedbackMessage.textContent = `残念、不正解です。正解は「${correctAnswer}」でした。`;
        feedbackMessage.classList.add('incorrect');
        clickedButton.classList.add('wrong-answer');
    }

    // 解説を表示
    heritageName.textContent = currentHeritage.name;
    heritageDescription.textContent = currentHeritage.description;
    explanationArea.style.display = 'block';

    nextButton.style.display = 'block'; // 次の質問ボタンを表示
    nextButton.textContent = (currentQuestionCount < QUIZ_LIMIT) ? '次の問題' : 'クイズ終了';
}

// クイズを終了する
function endQuiz() {
    questionText.textContent = 'クイズ終了！お疲れ様でした！';
    heritageImage.src = ''; // 画像をクリア
    heritageImage.alt = '';
    choicesArea.innerHTML = '';
    feedbackMessage.textContent = '';
    explanationArea.style.display = 'none';
    nextButton.style.display = 'none'; // 次の質問ボタンも隠す
    // 必要であれば、ここに最終スコア表示などのロジックを追加
}

// イベントリスナーの設定
nextButton.addEventListener('click', generateQuestion);

// ページが読み込まれたらクイズを初期化
document.addEventListener('DOMContentLoaded', initializeQuiz);
