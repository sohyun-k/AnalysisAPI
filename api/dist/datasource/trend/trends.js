"use strict";
exports.__esModule = true;
exports.continuousTrend = exports.pastTrend = void 0;
exports.pastTrend = {
    angry: {
        title: "이런! 화나는일이 많으셨군요!",
        caption: "지난 2주간 화나요를 20개 넘게 만들었어요.",
        content: "가끔은 화를 내야 할 때도 있지만 너무 많은 화는 좋지 않아요. 화나는 일들을 되돌아보면서 근본적인 원인을 찾아보세요. 근본적인 해결이 어렵다면, 긍정적인 감정을 더 많이 기록해보세요. 자연스럽게 화도 가라앉을 수 있어요."
    },
    dislike: {
        title: "싫. 어. 요.",
        caption: "지난 2주간 싫어요를 20개 넘게 만들었어요.",
        content: "싫어한다는 감정은 일시적 표현이지만, 더 깊은 부정적 감정의 신호일 수 있어요. 아래 모모리를 눌러 어떤 일이 부정적 감정을 느끼게 했는지 되돌아보세요. 부정적인 감정을 불러일으키는 환경을 개선하거나, 더 근본적인 원인을 찾아 해결할 수 있을 거예요."
    },
    fun: {
        title: "즐거운 인생, 행복한 삶",
        caption: "지난 2주간 신나요를 20개 넘게 만들었어요.",
        content: "요즘 신나는 일이 많으시군요! 아래 모모리를 눌러 즐거웠던 추억을 다시 되돌아보세요. 무엇이 나를 즐겁게 하는지 알아보고 더 많은 긍정적 감정을 기록할 수 있도록 그 요소를 강화해보세요. 긍정적인 감정은 삶을 가치있게 만드는데 큰 도움을 줍니다."
    },
    gloomy: {
        title: "많이 우울하세요?",
        caption: "지난 2주간 우울해요를 20개 넘게 만들었어요.",
        content: "많이 우울하신가요? 우울함에 빠져있으면 자신이 왜 우울한지조차도 잊게 되는 경우가 있죠. 아래 모모리를 눌러 무엇이 나를 우울하게 하는지 알아보세요. 깊은 우울감은 끝없는 심연 같지만, 이따금 원인을 아는 것만으로 자연스럽게 치유되기도 한답니다."
    },
    happy: {
        title: "행복한 일이 계속 많길 바라요",
        caption: "지난 2주간 행복해요를 20개 넘게 만들었어요.",
        content: "행복한 일들이 많이 있으셨다니 축하드려요. 행복은 인생에 있어 가장 중요한 가치 중 하나죠. 아래 모모리를 눌러 행복한 순간들을 되돌아보고, 다시 더 많은 행복한 감정을 기록해보세요. 앞으로도 행복한 일들이 더 가득할 거예요."
    },
    like: {
        title: "긍정적인 당신 좋아요",
        caption: "지난 2주간 좋아요를 20개 넘게 만들었어요.",
        content: "좋아한다는 감정은 가장 기본적인 긍정적 감정이지만, 더 많은 긍정적 감정을 불러올 수 있어요. 아래 모모리를 눌러 나는 어떤 것을 좋아했는지 되돌아보세요. 좋아하는 것들을 주변에 가까이해 나에게 더 긍정적인 환경을 만들어보세요. "
    },
    love: {
        title: "저도 사랑해요",
        caption: "지난 2주간 사랑해요를 20개 넘게 만들었어요.",
        content: "사랑은 알 수 없는 미지의 힘을 가지고 있다고 하죠. 당신의 사랑은 어떤 것에 대한 좋은 감정일 수도, 약간은 시리고 애틋한 감정일 수도 있어요. 아래 모모리를 눌러 어떤 사랑의 감정을 느꼈는지, 무엇이 나를 사랑하게 했는지 되돌아보세요."
    },
    nervous: {
        title: "불안하고 초조하신가요?",
        caption: "지난 2주간 불안해요를 20개 넘게 만들었어요.",
        content: "불안하신가요? 불안한 감정은 큰일을 앞두고 있거나, 나도 모르는 어떤 원인에 의해 생겨나요. 아래 모모리를 눌러 어떤 것이 나를 불안하게 했는지 알아보세요. 불안함은 원인을 아는 것만으로 해결되는 경우가 많답니다."
    },
    sad: {
        title: "슬픔을 안고 살아가는 우리",
        caption: "지난 2주간 슬퍼요를 20개 넘게 만들었어요.",
        content: "슬픈 일이 많으셨군요... 항상 즐겁게 살아가고 싶어도 어느 순간 예상치 못한 슬픔이 닥쳐오기도 하죠. 어떤 일이 있으셨나요? 아래 모모리를 눌러 슬펐던 순간을 돌아보세요. 슬픔은 지금은 아프고 시릴 수 있지만, 결국 시간이 지나면 우리를 더 단단하게 만들어요."
    },
    fuck: {
        title: "이런 씨발!",
        caption: "지난 2주간 좆같아요를 20개 넘게 만들었어요.",
        content: "개좆같은 일이 많으셨군요! 원래 인생은 좆같은 일의 연속이랍니다. 피할 수 없다면 즐겨보세요. 냉소적인 태도는 삶을 살아가는데 큰 도움이 됩니다."
    },
    regret: {
        title: "나는 왜그랬을까요?",
        caption: "지난 2주간 후회되요를 20개 넘게 만들었어요.",
        content: "깊게 후회되는 일이 있으시군요. 이미 지나간 일에 대한 후회는 쉽게 떨쳐버릴 수 없죠. 지금의 내가 할 수 있는 일은 없다고 생각이 들수도 있어요. 하지만 아무리 후회해도 우리는 계속 삶을 살아가고 시간은 흘러가요. 아래 모모리를 눌러 내 후회의 감정을 되돌아보고 앞으로는 더 나은 선택을 하기로해요. 제가 곁에 있으니까요."
    },
    scared: {
        title: "공포속에 홀로 있는 나",
        caption: "지난 2주간 무서워요를 20개 넘게 만들었어요.",
        content: "요즘 공포를 많이 느끼시는군요. 어떤것이 나를 공포에 빠지게 하나요? 아래 모모리를 눌러 나의 공포의 근원이 무엇인지 돌아보세요. 될수있다면 그 원인에서 멀어지고, 쉽게 환경을 바꿀 수 없다면 빠르게 주변에 도움을 요청하세요. 도움의 손길은 생각보다 가까이에 있어요."
    },
    annoyed: {
        title: "모든게 짜증나시나요?",
        caption: "지난 2주간 짜증나요를 20개 넘게 만들었어요.",
        content: "요즘 주변에 짜증나는 일이 많으시군요. 표면적으로는 그 대상이나 상황이 나를 짜증나게 하는것 같지만, 사실은 다른 근본적인 원인이 있을 수 있어요. 아래 모모리를 눌러 무엇이 나를 짜증나게 하는지, 왜 내가 짜증을 냈는지 되돌아보세요."
    },
    jealous: {
        title: "나는 질투의 화신",
        caption: "지난 2주간 샘나요를 20개 넘게 만들었어요.",
        content: "요즘 샘나는 것들이 주변에 넘쳐나는군요. 내가 많이 모자라고 별로라고 생각이 들수도 있어요. 아래 모모리를 눌러 무엇이 나를 샘나게 하는지 알아보세요. 지금 당장은 아니겠지만, 조금씩 조금씩 열심히 살다보면 어느새 꽤 괜찮아진 나를 만날거에요. 우리는 존재자체로 소중하니까요."
    },
    lethargic: {
        title: "아무런 힘이 없어요...",
        caption: "지난 2주간 무기력해요를 20개 넘게 만들었어요.",
        content: "아무것도 하기 싫고 그냥 멍하니 계신가요? 아래 모모리를 눌러 내 무기력함의 원인을 찾아보세요. 체력의 문제일수도, 큰 상실감의 표현일수도, 환경의 문제일수도 있어요. 원인을 알겠다면, 조금이라도 새로운일을 시도해보세요. 꼭 대단한 일이 아니어도 상관없어요. 조금씩 작은것들부터 해보는거에요."
    },
    calm: {
        title: "고요한 바다와 같은 나",
        caption: "지난 2주간 평온해요를 20개 넘게 만들었어요.",
        content: "평온한 나날이 계속되는군요. 우리는 간혹 이 평온함을 충분히 감사하지 않기도 하죠. 아래 모모리를 눌러 평온한 기분을 되돌아보고 미묘한 행복을 다시 느껴보세요. 다시 그 순간으로 날아가고 싶을거에요. 오늘도 평온한 하루 되세요."
    },
    proud: {
        title: "모모리의 모든 동물이 축하해요!",
        caption: "지난 2주간 뿌듯해요를 20개 넘게 만들었어요.",
        content: "들리세요? 모모리의 모든 동물이 박수와 환호성을 보내고있어요! 요즘 뿌듯할만한 일이 정말 많으시네요. 아래 모모리를 눌러 뿌듯했던 순간을 다시 음미해보세요. 열심히 살아온 당신이 정말 자랑스러워요. 앞으로도 뿌듯한일이 가득하기를 바라요."
    },
    surprised: {
        title: "세상은 놀랄일로 가득해",
        caption: "지난 2주간 놀라워요를 20개 넘게 만들었어요.",
        content: "요즘 인생이 놀라움의 연속이군요! 어떤 것이 당신을 이렇게 놀라게 했나요? 아래 모모리를 눌러 놀라웠던 순간을 다시 돌아보세요. 놀라움은 양면적인 얼굴을 가지고 있죠. 기분좋은 놀라움인지 불쾌한 놀라움인지 한번 알아보세요."
    },
    excited: {
        title: "설렘가득한 인생",
        caption: "지난 2주간 설레요를 20개 넘게 만들었어요.",
        content: "요즘 설레는일의 연속이군요! 달콤한 설렘이 계속되나요? 아니면 기대할만한 일이 생긴걸수도요. 아래 모모리를 눌러 나를 설레게 했던것이 무엇인지 돌아보세요. 설렘의 두근거림은 삶을 화창하게 만들죠. 그 미소가 계속 떠나지 않길 바라요."
    }
};
exports.continuousTrend = {
    angry: {
        title: "많이 화나시나요?",
        caption: "화나요를 3개 연속으로 만들었어요.",
        content: "요즘 화나는 일이 잦으셨군요. 화를 내면 지금 당장은 기분이 조금 나아질지 몰라도 결국은 부정적인 감정을 이끌어내기 마련이죠. 아래 모 모리를 눌러 어떤 일이 나를 화나게 만들었는지 살펴보고 어떻게 대응하는 것이 좋을지 생각해 보세요."
    },
    dislike: {
        title: "가끔은 모든게 싫을때가 있죠",
        caption: "싫어요를 3개 연속으로 만들었어요.",
        content: "싫어하는 것을 솔직하게 표현하는 것은 정신건강에 나쁘지 않지만, 결국 부정적인 감정이 나에게 다시 되돌아와 안 좋은 영향을 끼칠 수 있어요. 아래 모모리를 눌러 어떤 것이 싫었는지 한번 되돌아보세요. 미처 보지 못했던 긍정적인 면이 보일 수 있어요."
    },
    fun: {
        title: "와! 해피타임!",
        caption: "신나요를 3개 연속으로 만들었어요.",
        content: "요즘 신나는 일이 계속 일어나는군요! 아래 모모리를 눌러 즐거웠던 추억을 다시 되돌아보세요. 긍정적인 감정 기록을 늘려나가면 더 많은 긍정적 감정을 불러일으킬 수 있어요. 앞으로도 더 즐거운 일이 있기를 바라요."
    },
    gloomy: {
        title: "우울함은 언제나 올 수 있어요",
        caption: "우울해요를 3개 연속으로 만들었어요.",
        content: "요즘 우울하세요? 아래 모모리를 눌러 무엇이 나를 우울하게 했는지 알아보세요. 나를 우울하게 만드는 것을 멀리해보세요. 그냥 바깥에 나가 주변 풍경과 사람을 보며 잠시 걸어봐도 좋아요. 어느 순간 우울한 기분이 나도 모르게 사라질 수 있어요."
    },
    happy: {
        title: "행복은 가까이에 있어요",
        caption: "행복해요를 3개 연속으로 만들었어요.",
        content: "요즘 행복한 감정을 많이 기록하셨군요! 아래 모모리를 눌러 어떤 것이 나를 행복하게 했는지 알아보세요. 더 많은 긍정적인 기록을 통해 내 안에 숨어있던 행복한 감정을 찾아보세요. 어쩌면 가까운 곳에서 쉽게 찾을 수 있을지 몰라요."
    },
    like: {
        title: "계속 좋은일만 있기를",
        caption: "좋아요를 3개 연속으로 만들었어요.",
        content: "요즘 좋은 일이 많으셨군요! 아래 모모리를 눌러 어떤 것이 좋았는지 되돌아보세요. 앞으로도 더 많은 긍정적 감정을 기록한다면 내 주변에 좋은 일이 더 많이 생길 거예요. 긍정적인 감정은 다른 긍정적 감정을 끌어당기니까요."
    },
    love: {
        title: "사랑, 사랑, 사랑",
        caption: "사랑해요를 3개 연속으로 만들었어요.",
        content: "요즘 사랑에 빠진 뭔가가 생겼나요? 그 대상이 사람이든, 동물이든, 또 다른 무엇이든 사랑의 감정은 나에게 참 소중한 감정이에요. 아래 모모리를 눌러 어떤 사랑의 감정을 느꼈는지 돌아보세요. 앞으로도 사랑 가득한 매일 이어가봐요!"
    },
    nervous: {
        title: "어떤게 당신을 불안하게 하나요?",
        caption: "불안해요를 3개 연속으로 만들었어요.",
        content: "요즘 불안하시군요. 아래 모모리를 눌러 어떤 것이 나를 불안하게 하는지 알아보세요. 불안한 감정은 주변 환경에서 불안함을 유발하는 요소를 줄이거나, 가끔은 그 요소가 무엇인지 인식하는 것만으로도 개선될 수 있어요."
    },
    sad: {
        title: "슬픈일이 있으셨군요...",
        caption: "슬퍼요를 3개 연속으로 만들었어요.",
        content: "요즘 슬픈 일이 있으신가요? 무엇이 당신을 슬프게 하든, 우리에겐 슬픔을 감내해내고 앞으로 나아갈 수 있는 힘이 있어요. 아래 모모리를 눌러 슬펐던 순간을 돌아보세요. 나를 슬프게 한 일을 충분히 생각하고, 원하는 만큼 감정을 표현해보세요."
    },
    fuck: {
        title: "이런 개좆같은 일이!",
        caption: "좆같아요를 3개 연속으로 만들었어요.",
        content: "뭐가 당신을 좆같게 하나요? 당장이라도 해머를 들고 때려 부수고 싶나요? 하지만 어쩔 수 없습니다. 인생은 원래 그런 식이니까요. 진짜 인생은 달콤한 꿀을 눈앞에 들이밀고서 혀를 대려는 순간 뒤통수를 후리는 법이죠. 그때의 좆같은 감정이야말로 인생의 묘미 아니겠어요?"
    },
    regret: {
        title: "하아.. 후회스럽네요..",
        caption: "후회돼요를 3개 연속으로 만들었어요.",
        content: "후회되는 일이 있으신가요? 모든게 내탓인것 같고 기분이 별로겠죠. 하지만 깊은 후회를 통해 우리는 다시 같은실수를 반복하지 않을 수 있어요. 아래 모모리를 눌러 무엇이 후회스러운지 알아보세요. 내가 나아갈 새로운 방향이 보일 수 있어요."
    },
    scared: {
        title: "후덜덜.. 너무 무서워요",
        caption: "무서워요를 3개 연속으로 만들었어요.",
        content: "어떤 무서운일이 있었나요? 사람들은 내가 충분히 파악할 수 없는것에 공포를 느끼곤 하죠. 무엇이 나를 무섭게하는지 아래 모모리를 눌러 알아보세요. 생각보다는 별거 아닌것일수도, 생각보다 심각한 문제일수도 있어요."
    },
    annoyed: {
        title: "아 짜증나!!!",
        caption: "짜증나요를 3개 연속으로 만들었어요.",
        content: "맞아요. 짜증나죠. 가끔은 세상 모든게 짜증날 수 있어요. 내 뜻대로 되는게 없다거나 주변에 보기싫은 것이 있을 수도 있죠. 아래 모모리를 눌러 무엇이 나를 짜증나게 하는지 알아보세요. 지나고 나서 보면 생각보다 괜한일에 짜증을 냈을 수도 있어요."
    },
    jealous: {
        title: "많이 샘나시나요?",
        caption: "샘나요를 3개 연속으로 만들었어요.",
        content: "나보다 더 나은 상황에대한 질투는 자연스러운 감정이에요. 하지만 너무 과한 타인과의 비교는 내 마음을 병들게 할 수 있어요. 아래 모모리를 눌러 무엇이 나를 샘나게했는지 알아보세요. 그리고 나 스스로를 더 사랑해보기로 해요."
    },
    lethargic: {
        title: "요즘 많이 무기력해요...",
        caption: "무기력해요를 3개 연속으로 만들었어요.",
        content: "요즘 무기력하신가요? 무기력함은 여러 원인이 있어요. 아래 모모리를 눌러 나는 언제 무기력함을 느끼는지 알아보세요. 몸의 문제일수도, 마음의 문제일수도 있어요. 가끔은 원인을 아는것만으로 무기력에서 빠져나올 수 있답니다."
    },
    calm: {
        title: "조용한 바람, 평온한 하루",
        caption: "평온해요를 3개 연속으로 만들었어요.",
        content: "요즘 평온하시군요. 평온함은 바람같아서 쉽게 지나쳐버릴수도 있지만, 삶의 큰 기쁨중 하나죠. 아래 모모리를 눌러 평온했던 순간들을 돌아보고 다시 충분히 음미해보세요. 앞으로도 평온한 나날들이 계속되기를 바라요."
    },
    proud: {
        title: "정말 잘했어요!",
        caption: "뿌듯해요를 3개 연속으로 만들었어요.",
        content: "뿌듯한 일이 있으시군요! 너무 기뻐요! 만족스럽게 일을 마치고나면 정말 기분좋죠. 아래 모모리를 눌러 뿌듯했던 감정을 다시 돌아보세요. 또 다시 오늘의 뿌듯함을 위해 열심히 살아보기로 해요."
    },
    surprised: {
        title: "헉! 세상에!",
        caption: "놀라워요를 3개 연속으로 만들었어요.",
        content: "놀라운 일이 있으셨군요! 기분좋은 놀라움일수도, 불쾌한 놀라움일수도 있죠. 아래 모모리를 눌러 어떤것이 나를 놀라게 했는지 알아보세요. 가끔은 정신이 번쩍드는 놀라움도 삶에 좋은 조미료가 될 수 있어요."
    },
    excited: {
        title: "두근두근 설레요",
        caption: "설레요를 3개 연속으로 만들었어요.",
        content: "설레는 일이 생기셨군요! 어떤 종류의 설렘이든 기분좋은 두근거림은 언제나 환영이에요. 아래 모모리를 눌러 무엇이 나를 설레게했는지 돌아보세요. 이 설렘이 행복으로 부드럽게 이어지길 바라요."
    }
};
//# sourceMappingURL=trends.js.map