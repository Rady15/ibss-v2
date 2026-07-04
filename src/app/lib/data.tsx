import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

export type Lang = "ar" | "en";

export const IMG = {
  hero:          "https://images.unsplash.com/photo-1772475385529-92037713a057?w=1920&h=1080&fit=crop&auto=format",
  about:         "https://images.unsplash.com/photo-1767786330387-5cef0327b6c1?w=900&h=750&fit=crop&auto=format",
  aboutAccent:   "https://images.unsplash.com/photo-1779700314631-1f18b467e0a7?w=500&h=700&fit=crop&auto=format",
  conference:    "https://images.unsplash.com/photo-1760611656160-7c7bf7e6da9f?w=800&h=580&fit=crop&auto=format",
  reception:     "https://images.unsplash.com/photo-1759038085950-1234ca8f5fed?w=800&h=580&fit=crop&auto=format",
  lobby:         "https://images.unsplash.com/photo-1758448093806-88b2089068ab?w=800&h=580&fit=crop&auto=format",
  executive:     "https://images.unsplash.com/photo-1776482128008-2c9cf5bc0edc?w=800&h=580&fit=crop&auto=format",
  glassOffice:   "https://images.unsplash.com/photo-1772001936267-b6058748eff4?w=800&h=580&fit=crop&auto=format",
  panorama:      "https://images.unsplash.com/photo-1779700210487-a01758a3c55a?w=800&h=580&fit=crop&auto=format",
  leather:       "https://images.unsplash.com/photo-1771270759486-1f7703945072?w=800&h=580&fit=crop&auto=format",
  lounge:        "https://images.unsplash.com/photo-1774953037913-af0cf688491a?w=800&h=580&fit=crop&auto=format",
  modernLobby:   "https://images.unsplash.com/photo-1774192620896-98d79d750e15?w=800&h=580&fit=crop&auto=format",
  officeInt:     "https://images.unsplash.com/photo-1758630737900-a28682c5aa69?w=800&h=580&fit=crop&auto=format",
  marbleRec:     "https://images.unsplash.com/photo-1758448500688-3ababa93fd67?w=800&h=580&fit=crop&auto=format",
  corridor:      "https://images.unsplash.com/photo-1772475385509-93fd87a2d4ba?w=800&h=580&fit=crop&auto=format",
  team:          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&h=600&fit=crop&auto=format",
  blog1:         "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&auto=format",
  blog2:         "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop&auto=format",
  blog3:         "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop&auto=format",
  blog4:         "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop&auto=format",
  showroom:     "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=700&fit=crop&auto=format",
};

export const GOLD = "#C09A4F";
export const DARK = "#0C0B09";
export const IVORY = "#F7F4EE";
export const MUTED = "#78706A";

export const T = {
  ar: {
    nav: ["الرئيسية","من نحن","خدماتنا","منتجاتنا","أعمالنا","عملاؤنا","تواصل معنا"],
    navIds: ["home","about","services","products","projects","clients","contact"],
    cta: "تواصل معنا",
    langToggle: "EN",
    hero: {
      eyebrow: "IBSS INNOVATIONS — منذ ٢٠٠٨",
      h1: "نبتكر مساحات\nعمل ملهمة",
      sub: "حلول متكاملة لتأثيث وتجهيز المكاتب والشركات والمنشآت الصحية.",
      btn1: "عرض أعمالنا",
      btn2: "تواصل معنا",
      stats: [
        { v: "15+", l: "سنوات الخبرة" },
        { v: "500+", l: "مشروع منجز" },
        { v: "200+", l: "عميل موثوق" },
      ],
    },
    about: {
      label: "من نحن",
      h2: "رواد في تصميم وتجهيز بيئات العمل",
      body: "IBSS Innovations شركة رائدة في حلول تأثيث المكاتب والمنشآت الصحية والمؤسسية. نجمع بين الخبرة الممتدة لأكثر من خمسة عشر عاماً والرؤية الإبداعية لنصمم بيئات عمل تُلهم الإنتاجية، وتعكس هوية كل عميل بأسلوب يجمع الأصالة والحداثة.",
      milestones: [
        { y: "٢٠٠٨", e: "التأسيس في الرياض" },
        { y: "٢٠١٣", e: "التوسع إلى خمس مناطق" },
        { y: "٢٠١٨", e: "شراكات دولية مع كبار المصنعين" },
        { y: "٢٠٢٤", e: "تجاوز ٥٠٠ مشروع ناجح" },
      ],
    },
    why: {
      label: "لماذا نحن",
      h2: "معايير لا تقبل المساومة",
      items: [
        { t: "جودة استثنائية", d: "مواد أولية من أرقى المصادر العالمية بمعايير صارمة" },
        { t: "خبرة ١٥ عاماً", d: "تراكم خبري عميق في السوق السعودي والخليجي" },
        { t: "تصميم معاصر", d: "رؤية تصميمية تجمع الأصالة والحداثة في توازن مثالي" },
        { t: "قدرة تنفيذية ضخمة", d: "إمكانيات تنفيذية لأكبر المشاريع المؤسسية والحكومية" },
        { t: "دعم ما بعد البيع", d: "خدمة متكاملة وصيانة دورية لضمان استمرارية الأداء" },
        { t: "الالتزام بالمواعيد", d: "التزام صارم بالجداول الزمنية المتفق عليها" },
      ],
    },
    services: {
      label: "خدماتنا",
      h2: "حلول تأثيث شاملة",
      items: [
        { t: "أثاث المكاتب", d: "تشكيلة واسعة من الأثاث المكتبي العصري والمتكامل لكل بيئات العمل", img: IMG.officeInt },
        { t: "محطات العمل", d: "تصميم محطات عمل مريحة وعملية مع حلول ذكية لإدارة الكابلات", img: IMG.glassOffice },
        { t: "المكاتب التنفيذية", d: "تجهيزات فاخرة للمدراء والقيادات بتصاميم تعكس المكانة والاحترافية", img: IMG.executive },
        { t: "قاعات الاجتماعات", d: "حلول متكاملة تجمع الوظيفية والجماليات لغرف المؤتمرات والاجتماعات", img: IMG.conference },
        { t: "مناطق الاستقبال", d: "واجهات استقبال مميزة تُعبر عن هوية مؤسستك وتترك انطباعاً لا يُنسى", img: IMG.reception },
        { t: "المنشآت الصحية", d: "أثاث طبي وفق أعلى معايير الجودة والسلامة للمستشفيات والعيادات", img: IMG.modernLobby },
      ],
    },
    products: {
      label: "منتجاتنا",
      h2: "تشكيلة المنتجات المميزة",
      cats: ["الكل","مكاتب تنفيذية","كراسي المكاتب","طاولات اجتماعات","وحدات الاستقبال","محطات العمل","وحدات التخزين"],
    },
    projects: {
      label: "أعمالنا",
      h2: "مشاريع تتحدث عن نفسها",
      filters: ["الكل","مكاتب","مستشفيات","حكومي","فندقي"],
      viewAll: "عرض كل المشاريع",
    },
    clients: {
      label: "عملاؤنا",
      h2: "شراكات مبنية على الثقة",
      sub: "نفخر بثقة كبرى المؤسسات والشركات والجهات الحكومية في المملكة وخارجها",
    },
    process: {
      label: "آلية العمل",
      h2: "من الفكرة إلى الواقع",
      steps: [
        { n: "01", t: "الاستشارة", d: "نستمع إلى احتياجاتك ونحدد متطلبات مشروعك بدقة" },
        { n: "02", t: "التخطيط", d: "خطة تفصيلية وجدول زمني دقيق لضمان سير المشروع" },
        { n: "03", t: "التصميم", d: "فريق إبداعي يحوّل رؤيتك إلى مخططات احترافية" },
        { n: "04", t: "التصنيع", d: "تصنيع بأعلى معايير الجودة في منشآتنا المتطورة" },
        { n: "05", t: "التركيب", d: "تركيب احترافي من فرق متخصصة ومدربة على أعلى مستوى" },
        { n: "06", t: "الدعم", d: "دعم مستمر وصيانة دورية لضمان رضاك الكامل" },
      ],
    },
    testimonials: {
      label: "آراء عملائنا",
      h2: "ثقة تبنى على نتائج",
      items: [
        { q: "IBSS حوّلت مكاتبنا إلى بيئة عمل تعكس احترافيتنا بشكل مذهل. التصميم فاق توقعاتنا والتسليم كان في الموعد المحدد تماماً.", n: "م. خالد الرشيد", r: "المدير التنفيذي، مجموعة الرشيد للاستثمار" },
        { q: "تجربة متكاملة ومحترفة من أول لقاء الاستشارة حتى آخر لحظة في التسليم. الجودة تفوق ما توقعناه وفريقهم على أعلى مستوى.", n: "د. سارة المطيري", r: "مدير مستشفى الأمل التخصصي، الرياض" },
        { q: "وفّروا لنا حلولاً مبتكرة لمقر وزارتنا الجديد. الالتزام بالمعايير والمواعيد كان استثنائياً ويستحق كل الثناء.", n: "أ. عبدالله الدوسري", r: "مدير الخدمات الإدارية، وزارة التجارة" },
      ],
    },
    ctaSection: {
      h2: "هل أنت جاهز لتطوير مساحة العمل الخاصة بك؟",
      sub: "تواصل معنا اليوم للحصول على استشارة مجانية، ونبدأ رحلة تحويل مساحتك معاً",
      btn1: "اطلب عرض سعر",
      btn2: "تواصل معنا",
    },
    contact: {
      label: "تواصل معنا",
      h2: "نحن هنا لخدمتك",
      fields: { name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "رقم الجوال", company: "اسم الشركة", msg: "رسالتك", btn: "إرسال الرسالة" },
      info: [
        { icon: "phone", label: "هاتف", val: "+966 11 123 4567" },
        { icon: "mail", label: "بريد إلكتروني", val: "info@ibss.sa" },
        { icon: "whatsapp", label: "واتساب", val: "+966 50 123 4567" },
        { icon: "map", label: "العنوان", val: "الرياض، المملكة العربية السعودية" },
      ],
    },
    footer: {
      tagline: "نصنع بيئات عمل تُلهم",
      cols: [
        { h: "روابط سريعة", links: ["الرئيسية","من نحن","خدماتنا","منتجاتنا","أعمالنا","تواصل معنا"] },
        { h: "خدماتنا", links: ["أثاث المكاتب","محطات العمل","المكاتب التنفيذية","قاعات الاجتماعات","مناطق الاستقبال","المنشآت الصحية"] },
      ],
      copy: "© 2024 IBSS Innovations. جميع الحقوق محفوظة.",
    },
    pages: {
      about: {
        hero: { h1: "من نحن", sub: "رواد في تصميم وتجهيز بيئات العمل منذ 2008" },
        mission: { h2: "رسالتنا", body: "نعمل على تقديم حلول تأثيث مبتكرة ترتقي ببيئات العمل، وتعزز الإنتاجية والرفاهية في المساحات المؤسسية والصحية." },
        vision: { h2: "رؤيتنا", body: "أن نكون الخيار الأول في المنطقة لتصميم وتجهيز بيئات العمل، ونرسي معايير جديدة في الجودة والابتكار." },
        values: [
          { t: "الجودة", d: "نلتزم بأعلى معايير الجودة في كل منتج نقدمه وكل خدمة نقدمها." },
          { t: "الابتكار", d: "نسعى دائماً إلى تقديم حلول مبتكرة تتجاوز توقعات عملائنا." },
          { t: "النزاهة", d: "نعمل بشفافية وأمانة في كل تعاملاتنا مع العملاء والشركاء." },
          { t: "الالتزام", d: "نلتزم بوعودنا ومواعيدنا، ونحترم ثقة عملائنا فينا." },
        ],
        team: [
          { n: "م. فيصل البسام", r: "المؤسس والرئيس التنفيذي", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" },
          { n: "أ. نورة الشمري", r: "مديرة التصميم الداخلي", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face" },
          { n: "م. عبدالله القحطاني", r: "مدير العمليات", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" },
          { n: "أ. ليلى العتيبي", r: "مديرة حسابات كبار العملاء", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face" },
        ],
      },
      faq: {
        h1: "الأسئلة الشائعة",
        sub: "إجابات على أكثر الأسئلة تكراراً حول خدماتنا ومنتجاتنا",
        items: [
          { q: "ما هي أنواع الأثاث المكتبي التي تقدمونها؟", a: "نقدم تشكيلة واسعة تشمل المكاتب التنفيذية، محطات العمل، كراسي المكاتب، طاولات الاجتماعات، وحدات الاستقبال، أنظمة التخزين، وأثاث المنشآت الصحية. جميع منتجاتنا مصنوعة من أجود الخامات وتتوفر بتصاميم عصرية تناسب مختلف بيئات العمل." },
          { q: "هل تقدمون خدمات التصميم الداخلي؟", a: "نعم، لدينا فريق متخصص من مصممي المساحات المكتبية يقدم استشارات مجانية وتصاميم احترافية متكاملة. نبدأ بدراسة احتياجاتك ومساحتك ثم نقدم تصوراً ثلاثي الأبعاد قبل التنفيذ." },
          { q: "ما هي مدة تنفيذ المشروع؟", a: "تختلف المدة حسب حجم المشروع وتعقيداته. المشاريع الصغيرة تستغرق من أسبوع إلى أسبوعين، والمشاريع المتوسطة من 3 إلى 6 أسابيع، والمشاريع الكبيرة قد تستغرق 8 أسابيع أو أكثر. نحرص دائماً على الالتزام بالجدول الزمني المتفق عليه." },
          { q: "هل توفرون الضمان على منتجاتكم؟", a: "نعم، جميع منتجاتنا مغطاة بضمان يتراوح من 5 إلى 10 سنوات حسب نوع المنتج. كما نقدم عقود صيانة دورية لضمان استمرارية الأداء وجودة المنتجات لأطول فترة ممكنة." },
          { q: "هل تتعاملون مع الجهات الحكومية والمنشآت الصحية؟", a: "بالتأكيد، لدينا خبرة واسعة في تنفيذ مشاريع حكومية وصحية كبرى. نلتزم بأعلى معايير الجودة والسلامة المطلوبة في القطاعين الحكومي والصحي، ولدينا سجل حافل من المشاريع الناجحة مع وزارات وهيئات حكومية." },
          { q: "هل تقدمون استشارة مجانية؟", a: "نعم، نقدم استشارة أولية مجانية تشمل زيارة الموقع، وتقييم الاحتياجات، وتقديم تصور مبدئي للحلول المناسبة. يمكنك التواصل معنا عبر الهاتف أو الواتساب أو نموذج الاتصال لحجز موعد للاستشارة." },
          { q: "هل يمكن تخصيص الأثاث حسب متطلباتنا؟", a: "نعم، نوفر حلولاً مخصصة بالكامل تناسب احتياجاتك ومساحتك. نعمل معك لتطوير تصاميم فريدة تعكس هوية مؤسستك وتلبي متطلباتك الوظيفية والجمالية." },
          { q: "ما هي مناطق التغطية الجغرافية لخدماتكم؟", a: "نغطي جميع مناطق المملكة العربية السعودية، مع تركيز رئيسي على الرياض، جدة، الدمام، والخبر. كما لدينا القدرة على تنفيذ مشاريع في دول الخليج العربي عبر شركائنا المعتمدين." },
        ],
      },
      blog: {
        h1: "المدونة",
        sub: "آخر المقالات والنصائح حول تصميم وتأثيث بيئات العمل",
        items: [
          { id: "1", t: "كيف تختار الأثاث المكتبي المناسب لمؤسستك?", d: "دليل شامل لاختيار الأثاث المكتبي المناسب الذي يعزز الإنتاجية ويعكس هوية مؤسستك مع مراعاة الجودة والتصميم والميزانية.", img: IMG.blog1, date: "2024-12-15", cat: "نصائح" },
          { id: "2", t: "اتجاهات تصميم المكاتب في 2025", d: "نظرة على أحدث اتجاهات تصميم المكاتب العصرية من المساحات المفتوحة إلى التصميم الحيوي وتأثيره على إنتاجية الموظفين.", img: IMG.blog2, date: "2024-11-28", cat: "اتجاهات" },
          { id: "3", t: "أهمية الإضاءة في بيئات العمل", d: "كيف تؤثر الإضاءة الطبيعية والصناعية على راحة الموظفين وإنتاجيتهم، وأفضل حلول الإضاءة للمساحات المكتبية.", img: IMG.blog3, date: "2024-11-10", cat: "نصائح" },
          { id: "4", t: "تصميم مساحات العمل الصحية", d: "معايير تصميم المنشآت الصحية وأحدث حلول الأثاث الطبي التي تجمع بين الوظيفية والجماليات.", img: IMG.blog4, date: "2024-10-22", cat: "تصميم" },
          { id: "5", t: "دليل اختيار كراسي المكتب المريحة", d: "كل ما تحتاج معرفته عن الكراسي المكتبية المريحة وأهم المواصفات التي يجب مراعاتها لضمان راحة الموظفين.", img: IMG.executive, date: "2024-10-05", cat: "نصائح" },
          { id: "6", t: "كيف تزيد مساحة مكتبك بذكاء", d: "أفكار وحلول ذكية لاستغلال المساحات المكتبية الصغيرة بأفضل شكل ممكن دون التضحية بالراحة والأناقة.", img: IMG.officeInt, date: "2024-09-18", cat: "تصميم" },
        ],
      },
      legal: {
        privacy: {
          h1: "سياسة الخصوصية",
          updated: "آخر تحديث: ١ يناير ٢٠٢٤",
          sections: [
            { h: "المقدمة", b: "نحن في IBSS Innovations نلتزم بحماية خصوصية زوار موقعنا الإلكتروني وعملائنا. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات الشخصية التي تقدمها لنا." },
            { h: "المعلومات التي نجمعها", b: "قد نجمع المعلومات التالية: الاسم الكامل، البريد الإلكتروني، رقم الجوال، اسم الشركة، وأي معلومات أخرى تقدمها طواعية من خلال نماذج التواصل أو الاستفسار." },
            { h: "كيف نستخدم معلوماتك", b: "نستخدم المعلومات التي نجمعها للرد على استفساراتك، تقديم الخدمات التي تطلبها، تحسين موقعنا وخدماتنا، وإرسال تحديثات تسويقية (بموافقتك)." },
            { h: "حماية المعلومات", b: "نتخذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف أو الإتلاف." },
            { h: "مشاركة المعلومات", b: "لا نقوم ببيع أو تأجير أو مشاركة معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية دون موافقتك الصريحة." },
            { h: "الكوكيز", b: "نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل حركة المرور على موقعنا. يمكنك التحكم في إعدادات الكوكيز من متصفحك." },
            { h: "التواصل", b: "للاستفسار عن سياسة الخصوصية، يرجى التواصل معنا عبر البريد الإلكتروني: info@ibss.sa" },
          ],
        },
        terms: {
          h1: "شروط الاستخدام",
          updated: "آخر تحديث: ١ يناير ٢٠٢٤",
          sections: [
            { h: "قبول الشروط", b: "باستخدامك لهذا الموقع، فإنك توافق على الالتزام بشروط الاستخدام هذه. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع." },
            { h: "الملكية الفكرية", b: "جميع المحتويات المعروضة على هذا الموقع، بما في ذلك النصوص والصور والتصاميم والشعارات، هي ملك لشركة IBSS Innovations ومحمية بموجب قوانين الملكية الفكرية." },
            { h: "استخدام الموقع", b: "يُسمح لك باستخدام الموقع لأغراض مشروعة فقط. يُحظر استخدام الموقع بأي طريقة تنتهك القوانين المحلية أو الدولية." },
            { h: "الروابط الخارجية", b: "قد يحتوي موقعنا على روابط لمواقع خارجية. نحن غير مسؤولين عن محتوى أو ممارسات الخصوصية في تلك المواقع." },
            { h: "إخلاء المسؤولية", b: "يتم تقديم الموقع ومحتوياته 'كما هي' دون أي ضمانات. لا نضمن أن الموقع سيكون خالياً من الأخطاء أو متاحاً باستمرار." },
            { h: "تعديل الشروط", b: "نحتفظ بالحق في تعديل شروط الاستخدام في أي وقت. سيتم إخطارك بالتغييرات الجوهرية عبر البريد الإلكتروني أو إشعار على الموقع." },
          ],
        },
      },
    },
  },
  en: {
    nav: ["Home","About","Services","Products","Projects","Clients","Contact"],
    navIds: ["home","about","services","products","projects","clients","contact"],
    cta: "Contact Us",
    langToggle: "AR",
    hero: {
      eyebrow: "IBSS INNOVATIONS — EST. 2008",
      h1: "We Engineer\nInspiring Workspaces",
      sub: "Turnkey office furniture solutions for corporations, government entities, and healthcare facilities.",
      btn1: "View Our Work",
      btn2: "Contact Us",
      stats: [
        { v: "15+", l: "Years of Experience" },
        { v: "500+", l: "Projects Completed" },
        { v: "200+", l: "Trusted Clients" },
      ],
    },
    about: {
      label: "About Us",
      h2: "Pioneers in Workspace Design & Furnishing",
      body: "IBSS Innovations is a premier office furniture solutions provider with over 15 years of experience. We combine deep market expertise with creative vision to design work environments that inspire productivity and reflect each client's unique identity — blending heritage and contemporary design.",
      milestones: [
        { y: "2008", e: "Founded in Riyadh" },
        { y: "2013", e: "Expanded to 5 regions across KSA" },
        { y: "2018", e: "International manufacturing partnerships" },
        { y: "2024", e: "Surpassed 500 successful projects" },
      ],
    },
    why: {
      label: "Why Choose Us",
      h2: "Standards That Set Us Apart",
      items: [
        { t: "Exceptional Quality", d: "Premium raw materials sourced from world-class global suppliers" },
        { t: "15 Years Experience", d: "Deep expertise accumulated across the Saudi and Gulf markets" },
        { t: "Modern Design", d: "Design vision blending heritage and innovation in perfect balance" },
        { t: "Large-Scale Capacity", d: "Full execution capability for the largest institutional projects" },
        { t: "After-Sales Support", d: "Comprehensive service and periodic maintenance for lasting performance" },
        { t: "On-Time Delivery", d: "Strict adherence to agreed project timelines, every time" },
      ],
    },
    services: {
      label: "Services",
      h2: "Comprehensive Furnishing Solutions",
      items: [
        { t: "Office Furniture", d: "Wide range of modern, complete office furniture for every work environment", img: IMG.officeInt },
        { t: "Workstations", d: "Ergonomic workstations with intelligent cable management solutions", img: IMG.glassOffice },
        { t: "Executive Offices", d: "Premium furnishings for executives reflecting status and professionalism", img: IMG.executive },
        { t: "Meeting Rooms", d: "Complete solutions combining functionality and aesthetics for boardrooms", img: IMG.conference },
        { t: "Reception Areas", d: "Distinctive reception fronts that express your brand and leave lasting impressions", img: IMG.reception },
        { t: "Healthcare Furniture", d: "Medical-grade furniture meeting the highest safety and quality standards", img: IMG.modernLobby },
      ],
    },
    products: {
      label: "Products",
      h2: "Our Featured Collection",
      cats: ["All","Executive Desks","Office Chairs","Meeting Tables","Reception Units","Workstations","Storage Units"],
    },
    projects: {
      label: "Projects",
      h2: "Projects That Speak for Themselves",
      filters: ["All","Corporate","Healthcare","Government","Hospitality"],
      viewAll: "View All Projects",
    },
    clients: {
      label: "Clients",
      h2: "Partnerships Built on Trust",
      sub: "We are proud to serve leading corporations, institutions, and government entities across the Kingdom",
    },
    process: {
      label: "Our Process",
      h2: "From Vision to Reality",
      steps: [
        { n: "01", t: "Consultation", d: "We listen deeply to your needs and define precise project requirements" },
        { n: "02", t: "Planning", d: "Detailed project plan and precise timeline for seamless execution" },
        { n: "03", t: "Design", d: "Our creative team transforms your vision into professional specifications" },
        { n: "04", t: "Manufacturing", d: "Production to highest quality standards in our advanced facilities" },
        { n: "05", t: "Installation", d: "Professional installation by specialized, highly trained teams" },
        { n: "06", t: "Support", d: "Ongoing support and periodic maintenance for your complete satisfaction" },
      ],
    },
    testimonials: {
      label: "Testimonials",
      h2: "Trust Built on Results",
      items: [
        { q: "IBSS transformed our offices into a workspace that reflects our professionalism remarkably. The design exceeded expectations and delivery was perfectly on time.", n: "Eng. Khalid Al-Rashid", r: "CEO, Al-Rashid Investment Group" },
        { q: "A complete, professional experience from the first consultation to the last moment of delivery. Quality beyond what we expected and an exceptionally professional team.", n: "Dr. Sarah Al-Mutairi", r: "Director, Al-Amal Specialized Hospital, Riyadh" },
        { q: "They provided innovative solutions for our new ministry headquarters. Their commitment to standards and timelines was exceptional and truly commendable.", n: "Mr. Abdullah Al-Dosari", r: "Director of Admin Services, Ministry of Commerce" },
      ],
    },
    ctaSection: {
      h2: "Ready to Transform Your Workspace?",
      sub: "Contact us today for a free consultation, and let's begin transforming your space together",
      btn1: "Request a Quote",
      btn2: "Contact Us",
    },
    contact: {
      label: "Contact Us",
      h2: "We're Here to Serve You",
      fields: { name: "Full Name", email: "Email Address", phone: "Phone Number", company: "Company Name", msg: "Your Message", btn: "Send Message" },
      info: [
        { icon: "phone", label: "Phone", val: "+966 11 123 4567" },
        { icon: "mail", label: "Email", val: "info@ibss.sa" },
        { icon: "whatsapp", label: "WhatsApp", val: "+966 50 123 4567" },
        { icon: "map", label: "Address", val: "Riyadh, Saudi Arabia" },
      ],
    },
    footer: {
      tagline: "We Create Workspaces That Inspire",
      cols: [
        { h: "Quick Links", links: ["Home","About","Services","Products","Projects","Contact"] },
        { h: "Services", links: ["Office Furniture","Workstations","Executive Offices","Meeting Rooms","Reception Areas","Healthcare Furniture"] },
      ],
      copy: "© 2024 IBSS Innovations. All rights reserved.",
    },
    pages: {
      about: {
        hero: { h1: "About Us", sub: "Pioneers in Workspace Design & Furnishing Since 2008" },
        mission: { h2: "Our Mission", body: "We deliver innovative furnishing solutions that elevate workspaces, enhancing productivity and well-being across corporate and healthcare environments." },
        vision: { h2: "Our Vision", body: "To be the premier choice in the region for workspace design and furnishing, setting new standards in quality and innovation." },
        values: [
          { t: "Quality", d: "We uphold the highest quality standards in every product we deliver and every service we provide." },
          { t: "Innovation", d: "We constantly pursue innovative solutions that exceed our clients' expectations." },
          { t: "Integrity", d: "We operate with transparency and honesty in all dealings with clients and partners." },
          { t: "Commitment", d: "We honor our promises and deadlines, respecting the trust our clients place in us." },
        ],
        team: [
          { n: "Eng. Faisal Al-Bassam", r: "Founder & CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" },
          { n: "Ms. Noura Al-Shammari", r: "Director of Interior Design", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face" },
          { n: "Eng. Abdullah Al-Qahtani", r: "Operations Director", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" },
          { n: "Ms. Laila Al-Otaibi", r: "Key Accounts Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face" },
        ],
      },
      faq: {
        h1: "Frequently Asked Questions",
        sub: "Answers to the most common questions about our services and products",
        items: [
          { q: "What types of office furniture do you offer?", a: "We offer a wide range including executive desks, workstations, office chairs, meeting tables, reception units, storage systems, and healthcare furniture. All our products are made from premium materials and feature modern designs suitable for various work environments." },
          { q: "Do you offer interior design services?", a: "Yes, we have a specialized team of workspace designers who provide free consultations and complete professional designs. We start by studying your needs and space, then deliver a 3D visualization before execution." },
          { q: "How long does project implementation take?", a: "Timelines vary by project scope. Small projects take 1-2 weeks, medium projects 3-6 weeks, and large projects may take 8 weeks or more. We are committed to meeting agreed timelines." },
          { q: "Do you provide warranties on your products?", a: "Yes, all our products are covered by warranties ranging from 5 to 10 years depending on the product type. We also offer periodic maintenance contracts to ensure lasting performance." },
          { q: "Do you work with government and healthcare entities?", a: "Absolutely. We have extensive experience executing major government and healthcare projects. We adhere to the highest quality and safety standards required in both sectors." },
          { q: "Do you offer free consultations?", a: "Yes, we provide a free initial consultation including site visit, needs assessment, and preliminary solution proposals. Contact us via phone, WhatsApp, or our contact form to schedule an appointment." },
          { q: "Can furniture be customized to our requirements?", a: "Yes, we offer fully customized solutions tailored to your needs and space. We work with you to develop unique designs that reflect your brand identity and meet your functional and aesthetic requirements." },
          { q: "What geographic areas do you serve?", a: "We cover all regions of Saudi Arabia, with primary focus on Riyadh, Jeddah, Dammam, and Al Khobar. We can also execute projects in GCC countries through our authorized partners." },
        ],
      },
      blog: {
        h1: "Our Blog",
        sub: "Latest articles and tips on workspace design and furnishing",
        items: [
          { id: "1", t: "How to Choose the Right Office Furniture for Your Organization", d: "A comprehensive guide to selecting office furniture that boosts productivity and reflects your brand identity while considering quality, design, and budget.", img: IMG.blog1, date: "2024-12-15", cat: "Tips" },
          { id: "2", t: "Office Design Trends for 2025", d: "A look at the latest office design trends from open spaces to biophilic design and their impact on employee productivity.", img: IMG.blog2, date: "2024-11-28", cat: "Trends" },
          { id: "3", t: "The Importance of Lighting in Work Environments", d: "How natural and artificial lighting affects employee comfort and productivity, and the best lighting solutions for office spaces.", img: IMG.blog3, date: "2024-11-10", cat: "Tips" },
          { id: "4", t: "Designing Healthcare Work Spaces", d: "Standards for healthcare facility design and the latest medical furniture solutions combining functionality and aesthetics.", img: IMG.blog4, date: "2024-10-22", cat: "Design" },
          { id: "5", t: "Guide to Choosing Ergonomic Office Chairs", d: "Everything you need to know about ergonomic office chairs and key specifications to ensure employee comfort.", img: IMG.executive, date: "2024-10-05", cat: "Tips" },
          { id: "6", t: "Smart Ways to Maximize Your Office Space", d: "Smart ideas and solutions for making the most of small office spaces without sacrificing comfort and style.", img: IMG.officeInt, date: "2024-09-18", cat: "Design" },
        ],
      },
      legal: {
        privacy: {
          h1: "Privacy Policy",
          updated: "Last updated: January 1, 2024",
          sections: [
            { h: "Introduction", b: "At IBSS Innovations, we are committed to protecting the privacy of our website visitors and clients. This Privacy Policy explains how we collect, use, and protect your personal information." },
            { h: "Information We Collect", b: "We may collect: full name, email address, phone number, company name, and any other information you voluntarily provide through our contact or inquiry forms." },
            { h: "How We Use Your Information", b: "We use collected information to respond to your inquiries, provide requested services, improve our website and services, and send marketing updates (with your consent)." },
            { h: "Information Protection", b: "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction." },
            { h: "Information Sharing", b: "We do not sell, rent, or share your personal information with third parties for marketing purposes without your explicit consent." },
            { h: "Cookies", b: "We use cookies to enhance browsing experience and analyze website traffic. You can control cookie settings through your browser." },
            { h: "Contact", b: "For privacy policy inquiries, please contact us at: info@ibss.sa" },
          ],
        },
        terms: {
          h1: "Terms of Service",
          updated: "Last updated: January 1, 2024",
          sections: [
            { h: "Acceptance of Terms", b: "By using this website, you agree to be bound by these Terms of Service. If you do not agree with any term, please do not use the site." },
            { h: "Intellectual Property", b: "All content on this website, including text, images, designs, and logos, is the property of IBSS Innovations and is protected by intellectual property laws." },
            { h: "Website Use", b: "You may use the website for lawful purposes only. Any use that violates local or international laws is prohibited." },
            { h: "External Links", b: "Our website may contain links to external sites. We are not responsible for the content or privacy practices of those sites." },
            { h: "Disclaimer", b: "The website and its content are provided 'as is' without any warranties. We do not guarantee that the site will be error-free or continuously available." },
            { h: "Changes to Terms", b: "We reserve the right to modify these terms at any time. Material changes will be notified via email or site notice." },
          ],
        },
      },
    },
  },
};

export const PRODUCTS = [
  { id:1, cat:"executive", title:"Apex Executive Desk", sub:"مكتب تنفيذي", img: IMG.executive, desc:"مكتب تنفيذي فاخر يجمع بين التصميم العصري والخامات عالية الجودة. مصمم ليعكس المكانة والاحترافية في بيئات العمل القيادية.", features: ["سطح عمل واسع من الخشب الطبيعي", "نظام إدارة كابلات مدمج", "إضاءة LED محيطية", "أدراج بقفل أمان", "مقاسات قابلة للتخصيص"], sizes: ["180×80×75 cm", "200×90×75 cm", "220×100×75 cm"] },
  { id:2, cat:"chairs",    title:"Lumbar Pro Chair",   sub:"كرسي تنفيذي",  img: IMG.lounge, desc:"كرسي مكتب إرجونوميك بتقنيات متطورة لدعم العمود الفقري وتوفير أقصى درجات الراحة طوال يوم العمل.", features: ["دعم قطني قابل للتعديل", "مساند ذراع 4D", "إمالة متعددة المستويات", "شبكة تهوية عالية الكثافة", "قاعدة ألمنيوم متينة"], sizes: ["Standard", "Premium", "Executive Plus"] },
  { id:3, cat:"meeting",   title:"Vega Conference Table", sub:"طاولة اجتماعات", img: IMG.conference, desc:"طاولة اجتماعات أنيقة وعملية تتسع لفرق العمل المختلفة، مع تكامل تقني يسهل عملية العرض والاجتماعات.", features: ["سطح زجاجي مقسّى", "نظام كابلات مخفي", "منافذ طاقة USB وHDMI", "قاعدة معدنية متينة", "متوافقة مع أنظمة الفيديو كونفرنس"], sizes: ["240×120×75 cm", "300×150×75 cm", "360×180×75 cm"] },
  { id:4, cat:"reception", title:"Marble Reception Counter", sub:"كاونتر استقبال", img: IMG.marbleRec, desc:"كاونتر استقبال فاخر بتصميم جريء يترك انطباعاً لا يُنسى لدى زوار مؤسستك.", features: ["سطح رخام طبيعي", "إضاءة LED محيطية", "واجهة من الألمنيوم والزجاج", "منطقة عمل مخفية", "شعار المؤسسة مضاء"], sizes: ["200×80×110 cm", "250×90×110 cm", "300×100×110 cm"] },
  { id:5, cat:"workstation","title":"Grid Workstation System", sub:"محطة عمل", img: IMG.glassOffice, desc:"نظام محطات عمل معياري ومرن يتيح تكوينات متعددة تناسب مختلف فرق العمل والمساحات.", features: ["فواصل زجاجية مانعة للصوت", "نظام كابلات أرضي", "إضاءة فردية لكل محطة", "أدراج وحجيرات تخزين", "قابل للتوسيع وإعادة التشكيل"], sizes: ["120×60 cm single", "140×70 cm single", "160×80 cm single"] },
  { id:6, cat:"storage",   title:"Archive Storage Unit", sub:"وحدة تخزين", img: IMG.officeInt, desc:"حلول تخزين ذكية وعملية تحافظ على تنظيم المساحة المكتبية وتوفر سهولة الوصول للملفات والوثائق.", features: ["نظام إغلاق هادئ", "أرفف قابلة للتعديل", "مقاومة للرطوبة والحرارة", "أقفال أمان مدمجة", "تصميم معياري"], sizes: ["90×40×200 cm", "120×45×200 cm", "150×50×200 cm"] },
  { id:7, cat:"executive", title:"Nocturne Desk Set",  sub:"طقم مكتب تنفيذي", img: IMG.about, desc:"طقم متكامل للمكاتب التنفيذية يشمل المكتب والكرسي وخزانة الملفات بتصميم متناغم وأنيق.", features: ["طقم 3 قطع متكامل", "خشب الجوز الطبيعي", "تشطيب يدوي فاخر", "نظام إضاءة مدمج", "ضمان 10 سنوات"], sizes: ["Set A: 180cm Desk", "Set B: 200cm Desk", "Set C: 220cm Desk"] },
  { id:8, cat:"chairs",    title:"Aire Task Chair",    sub:"كرسي مهام",   img: IMG.panorama, desc:"كرسي مهام خفيف ومريح بتصميم عصري يناسب ساعات العمل الطويلة في المكاتب ومراكز الاتصال.", features: ["ظهر شبكي مسامي", "ارتفاع ويميل قابل للتعديل", "مساند ذراع 2D", "عجلات ناعمة صامتة", "مقعد مبطن برغوة الذاكرة"], sizes: ["Small/Medium", "Medium/Large", "Large/Extra Large"] },
];

export const PROJECTS = [
  { id:1, cat:"corporate",    title:"مجمع الرياض المالي", sub:"Riyadh Financial Complex", img: IMG.glassOffice, year:"2024", area:"4,200 م²", desc:"تجهيز كامل لمجمع مكون من 6 طوابق بأحدث حلول الأثاث المكتبي لمجموعة من المؤسسات المالية.", scope: ["تصميم وتنفيذ 250 محطة عمل", "تجهيز 15 قاعة اجتماعات", "أثاث المكاتب التنفيذية", "مناطق الاستقبال والصالات"], client:"الرياض المالية" },
  { id:2, cat:"healthcare",   title:"مستشفى الأمل التخصصي", sub:"Al-Amal Specialized Hospital", img: IMG.modernLobby, year:"2023", area:"3,800 م²", desc:"تجهيز شامل لمستشفى تخصصي بأثاث طبي وفق أعلى معايير الجودة والسلامة.", scope: ["أثاث غرف المرضى", "محطات التمريض", "غرف العمليات", "مناطق الانتظار والعيادات"], client:"وزارة الصحة" },
  { id:3, cat:"government",   title:"مقر وزارة التجارة", sub:"Ministry of Commerce HQ", img: IMG.corridor, year:"2024", area:"6,500 م²", desc:"أكبر مشروع حكومي في مجال تأثيث المكاتب، تجهيز كامل لمبنى الوزارة بأحدث التصاميم.", scope: ["تجهيز 500+ مكتب", "قاعات المؤتمرات", "المكتب التنفيذي للوزير", "مركز خدمة العملاء"], client:"وزارة التجارة" },
  { id:4, cat:"hospitality",  title:"فندق النخيل الكبرى", sub:"Al-Nakhl Grand Hotel", img: IMG.leather, year:"2023", area:"2,100 م²", desc:"أثاث راقي للأجنحة التنفيذية والصالات في أحد أفخم فنادق الرياض.", scope: ["الأجنحة التنفيذية", "الصالات واللوبي", "قاعات المؤتمرات", "المكتب الإداري للفندق"], client:"مجموعة النخيل" },
  { id:5, cat:"corporate",    title:"برج المملكة — الطوابق التنفيذية", sub:"Kingdom Tower — Executive Floors", img: IMG.panorama, year:"2022", area:"5,000 م²", desc:"تجهيز 12 طابقاً من المكاتب التنفيذية في أبرز معالم الرياض.", scope: ["مكاتب تنفيذية", "قاعات مجالس", "صالات استقبال", "غرفة الطعام التنفيذية"], client:"شركة المملكة القابضة" },
  { id:6, cat:"healthcare",   title:"عيادات ميديكال بارك", sub:"Medical Park Clinics", img: IMG.reception, year:"2024", area:"1,600 م²", desc:"حلول متكاملة لتجهيز مجمع عيادات طبية متعددة التخصصات.", scope: ["أثاث العيادات", "محطات التمريض", "مناطق الانتظار", "المختبرات"], client:"مجموعة ميديكال بارك" },
  { id:7, cat:"corporate",    title:"مقر أرامكو السعودية — الإضافة الجديدة", sub:"Saudi Aramco HQ Expansion", img: IMG.officeInt, year:"2023", area:"8,200 م²", desc:"أكبر مشروع في تاريخنا، تجهيز مبنى إداري متكامل لأكبر شركة نفط في العالم.", scope: ["800+ محطة عمل", "مكاتب تنفيذية", "مركز التدريب", "المسرح الداخلي"], client:"أرامكو السعودية" },
  { id:8, cat:"government",   title:"مركز خدمة المواطنين", sub:"Citizen Service Center", img: IMG.lobby, year:"2022", area:"2,900 م²", desc:"تصميم وتجهيز مركز خدمة حكومي يجمع بين الوظيفية والجماليات.", scope: ["منطقة استقبال", "مكاتب خدمة", "قاعات انتظار", "غرف اجتماعات"], client:"برنامج التحول الوطني" },
];

export const CLIENTS = [
  "Saudi Aramco","STC Group","Ministry of Health","NEOM","AlAhli Bank",
  "King Fahd Hospital","Alfanar Group","Aldar Properties","SABIC","PIF",
  "Ministry of Commerce","Riyad Bank","Saudi Electricity Co.","Jarir Group",
  "Mobily","Abdul Latif Jameel",
];

export const BLOG_POSTS: Record<string, { sections: { h2: string; body: string }[] }> = {
  "1": { sections: [
    { h2: "تقييم احتياجات مؤسستك", body: "قبل البدء في اختيار الأثاث المكتبي، من الضروري فهم احتياجات مؤسستك بشكل دقيق. قم بتحليل طبيعة العمل، عدد الموظفين، والأقسام المختلفة. حدد المساحات المتاحة وكيفية استغلالها بأفضل شكل." },
    { h2: "الجودة مقابل التكلفة", body: "الاستثمار في الأثاث عالي الجودة يوفر لك المال على المدى الطويل. الأثاث المتين يدوم لسنوات ويحافظ على مظهره الجيد، بينما الأثاث الرخيص قد يحتاج للاستبدال بشكل متكرر." },
    { h2: "التصميم والإنتاجية", body: "للمساحة المكتبية تأثير مباشر على إنتاجية الموظفين. الأثاث المريح والمنظم يساهم في تقليل الإجهاد وزيادة التركيز. اختر ألواناً وتصاميم تعزز الطاقة الإيجابية." },
  ]},
  "2": { sections: [
    { h2: "المساحات المفتوحة", body: "تستمر المساحات المفتوحة في الهيمنة على تصميم المكاتب العصرية، لكن مع توفير مناطق هادئة للعمل المركز. التوازن بين التعاون والخصوصية هو المفتاح." },
    { h2: "التصميم الحيوي", body: "دمج العناصر الطبيعية في بيئة العمل، من النباتات الداخلية إلى المواد الطبيعية والإضاءة الطبيعية، يعزز صحة الموظفين وإبداعهم." },
    { h2: "التكنولوجيا الذكية", body: "المكاتب الذكية المزودة بأنظمة إدارة الكابلات ومنافذ الشحن المدمجة وأجهزة الاستشعار أصبحت معياراً أساسياً في تصاميم 2025." },
  ]},
  "3": { sections: [
    { h2: "الإضاءة الطبيعية", body: "التعرض للضوء الطبيعي يحسن المزاج والإنتاجية وجودة النوم. صمم مساحات العمل لتعظيم دخول الضوء الطبيعي مع توفير ستائر للتحكم في الوهج." },
    { h2: "الإضاءة الصناعية", body: "استخدم طبقات متعددة من الإضاءة: إضاءة محيطية عامة، إضاءة مهام موجهة، وإضاءة مميزة. الإضاءة القابلة للتعديل تتيح للموظفين التحكم في بيئتهم." },
    { h2: "درجة حرارة اللون", body: "الإضاءة البيضاء الدافئة (2700-3000K) مناسبة لمناطق الاسترخاء، بينما الإضاءة البيضاء المحايدة (3500-4500K) مثالية لمناطق العمل." },
  ]},
  "4": { sections: [
    { h2: "معايير المنشآت الصحية", body: "تخضع المنشآت الصحية لمعايير صارمة في اختيار الأثاث والتجهيزات. يجب أن يكون الأثاث سهل التنظيف ومقاوماً للبكتيريا ومتوافقاً مع معايير مكافحة العدوى." },
    { h2: "راحة المرضى والمراجعين", body: "تصميم مساحات الانتظار والعيادات يراعي راحة المرضى والمراجعين. اختر أثاثاً مريحاً وسهل الحركة يناسب احتياجات مختلف الفئات العمرية." },
    { h2: "كفاءة فريق العمل", body: "بيئة العمل للممارسين الصحيين تؤثر مباشرة على جودة الرعاية. محطات التمريض المريحة والمكاتب الإدارية المنظمة تساهم في تحسين الأداء." },
  ]},
  "5": { sections: [
    { h2: "الدعم القطني", body: "الدعم القطني القابل للتعديل هو أهم ميزة في الكرسي المكتبي المريح. يضمن محاذاة العمود الفقري بشكل صحيح ويقلل آلام الظهر." },
    { h2: "ارتفاع المقعد والذراعين", body: "يجب أن يكون ارتفاع المقعد قابلاً للتعديل بحيث تكون القدمان مسطحتين على الأرض. مساند الذراعين القابلة للتعديل تخفف الضغط على الكتفين والرقبة." },
    { h2: "المواد والتهوية", body: "الكراسي ذات ظهور شبكي تسمح بتهوية أفضل وتحافظ على برودة الجسم. اختيار مواد عالية الجودة يضمن متانة الكرسي وراحته لسنوات." },
  ]},
  "6": { sections: [
    { h2: "الأثاث متعدد الاستخدامات", body: "اختر أثاثاً يمكن استخدامه لأغراض متعددة. المكاتب القابلة للتحويل، الطاولات القابلة للطي، والوحدات التخزينية متعددة الوظائف توفر مساحة كبيرة." },
    { h2: "استغلال المساحات الرأسية", body: "لا تهمل المساحات الرأسية. الرفوف المعلقة وخزائن الحائط تستغل الجدران وتوفر مساحة أرضية ثمينة. استخدم المنظمات الرأسية للملفات والوثائق." },
    { h2: "التنظيم الذكي", body: "أنظمة تنظيم المكاتب الذكية تحافظ على مساحة عمل مرتبة ومنتجة. استخدم فواصل الأدراج، حاملات الكابلات، ومنظمات المكتب للحفاظ على كل شيء في مكانه." },
  ]},
  en: {
    "1": { sections: [
      { h2: "Assess Your Organization's Needs", body: "Before selecting office furniture, it's essential to understand your organization's needs. Analyze work patterns, employee count, and different departments. Determine available spaces and how to utilize them best." },
      { h2: "Quality vs. Cost", body: "Investing in high-quality furniture saves money long-term. Durable furniture lasts for years and maintains its appearance, while cheaper furniture may need frequent replacement." },
      { h2: "Design and Productivity", body: "Office space directly impacts employee productivity. Comfortable and organized furniture reduces stress and increases focus. Choose colors and designs that promote positive energy." },
    ]},
    "2": { sections: [
      { h2: "Open Spaces", body: "Open spaces continue to dominate modern office design, but with quiet zones provided for focused work. Balance between collaboration and privacy is key." },
      { h2: "Biophilic Design", body: "Integrating natural elements into the work environment, from indoor plants to natural materials and lighting, enhances employee health and creativity." },
      { h2: "Smart Technology", body: "Smart offices equipped with cable management systems, integrated charging ports, and sensors have become a standard in 2025 designs." },
    ]},
    "3": { sections: [
      { h2: "Natural Light", body: "Exposure to natural light improves mood, productivity, and sleep quality. Design workspaces to maximize natural light entry while providing blinds for glare control." },
      { h2: "Artificial Lighting", body: "Use multiple lighting layers: general ambient lighting, directed task lighting, and accent lighting. Adjustable lighting lets employees control their environment." },
      { h2: "Color Temperature", body: "Warm white light (2700-3000K) suits relaxation areas, while neutral white light (3500-4500K) is ideal for work areas." },
    ]},
    "4": { sections: [
      { h2: "Healthcare Standards", body: "Healthcare facilities follow strict standards for furniture and equipment selection. Furniture must be easy to clean, antibacterial, and compliant with infection control standards." },
      { h2: "Patient Comfort", body: "Designing waiting areas and clinics considers patient comfort. Choose comfortable, easy-to-move furniture suitable for different age groups." },
      { h2: "Staff Efficiency", body: "The work environment for healthcare practitioners directly impacts care quality. Comfortable nursing stations and organized administrative offices improve performance." },
    ]},
    "5": { sections: [
      { h2: "Lumbar Support", body: "Adjustable lumbar support is the most important feature of an ergonomic office chair. It ensures proper spine alignment and reduces back pain." },
      { h2: "Seat Height and Armrests", body: "Seat height should be adjustable so feet rest flat on the floor. Adjustable armrests relieve pressure on shoulders and neck." },
      { h2: "Materials and Breathability", body: "Chairs with mesh backs allow better ventilation and keep the body cool. High-quality materials ensure durability and comfort for years." },
    ]},
    "6": { sections: [
      { h2: "Multi-purpose Furniture", body: "Choose furniture that serves multiple purposes. Convertible desks, folding tables, and multi-functional storage units save significant space." },
      { h2: "Vertical Space Utilization", body: "Don't neglect vertical spaces. Wall-mounted shelves and cabinets utilize walls and free up valuable floor space. Use vertical organizers for files and documents." },
      { h2: "Smart Organization", body: "Smart office organization systems maintain a tidy and productive workspace. Use drawer dividers, cable holders, and desk organizers to keep everything in place." },
    ]},
  },
};

export const SERVICE_DETAILS: Record<string, { desc: string; features: string[]; process: string[]; img: string }> = {
  ar: {
    "أثاث المكاتب": { desc: "نقدم تشكيلة واسعة من الأثاث المكتبي العصري المصمم ليلبي احتياجات مختلف بيئات العمل. من المكاتب التنفيذية إلى محطات العمل الجماعية، نحرص على توفير منتجات تجمع بين الجودة العالية والتصميم الأنيق.", features: ["تشكيلة متنوعة من التصاميم", "خامات عالية الجودة", "ضمان يصل إلى 10 سنوات", "خيارات تخصيص متعددة", "أسعار تنافسية"], process: ["استشارة مجانية وتقييم الاحتياجات", "تقديم تصاميم وعروض أسعار", "التصنيع حسب الطلب", "التركيب والدعم"], img: IMG.officeInt },
    "محطات العمل": { desc: "محطات عمل معيارية ومرنة تتيح تكوينات متعددة تناسب فرق العمل المختلفة. صممناها لتعزيز التعاون والإنتاجية مع توفير الخصوصية والراحة.", features: ["تصميم معياري مرن", "فواصل مانعة للصوت", "نظام كابلات ذكي", "إضاءة فردية", "قابلية التوسيع"], process: ["تخطيط المساحة", "اختيار التكوين المناسب", "تصنيع وتجهيز", "تركيب احترافي"], img: IMG.glassOffice },
    "المكاتب التنفيذية": { desc: "تجهيزات فاخرة للمدراء والقيادات بتصاميم تعكس المكانة والاحترافية. نقدم حلولاً متكاملة تجمع بين الفخامة والوظيفية.", features: ["خامات طبيعية فاخرة", "تصاميم حصرية", "تكامل تكنولوجي", "تشطيب يدوي", "ضمان ممتد"], process: ["استشارة تصميمية", "مقترحات تصاميم حصرية", "تصنيع حسب الطلب", "تسليم وتركيب"], img: IMG.executive },
    "قاعات الاجتماعات": { desc: "حلول متكاملة لغرف المؤتمرات والاجتماعات تجمع بين الوظيفية والجماليات. نضمن لك مساحة تلهم الإبداع والتعاون.", features: ["أنظمة صوت ومرئيات", "طاولات بتكامل تكنولوجي", "إضاءة متعددة المستويات", "عزل صوتي", "تصاميم مرنة"], process: ["تحليل الاحتياجات", "تصميم القاعة", "تجهيز الأنظمة", "تشغيل وضبط"], img: IMG.conference },
    "مناطق الاستقبال": { desc: "واجهات استقبال مميزة تُعبر عن هوية مؤسستك وتترك انطباعاً لا يُنسى. نصمم مساحات ترحيبية تجمع بين الأناقة والعملية.", features: ["تصاميم جرئية ومبتكرة", "إضاءة مميزة", "شعار المؤسسة", "مناطق جلوس مريحة", "خامات فاخرة"], process: ["تصميم مخصص", "اختيار الخامات", "تصنيع", "تركيب"], img: IMG.reception },
    "المنشآت الصحية": { desc: "أثاث طبي وفق أعلى معايير الجودة والسلامة للمستشفيات والعيادات. نضمن الامتثال للمعايير الصحية مع الحفاظ على الجماليات.", features: ["مقاوم للبكتيريا", "سهل التنظيف والتعقيم", "متوافق مع المعايير الصحية", "مريح للمرضى", "متين وطويل العمر"], process: ["دراسة المعايير", "تطوير حلول مخصصة", "تصنيع معتمد", "تركيب وضمان"], img: IMG.modernLobby },
  },
  en: {
    "Office Furniture": { desc: "We offer a wide range of modern office furniture designed to meet the needs of various work environments. From executive desks to collaborative workstations, we ensure products that combine high quality with elegant design.", features: ["Diverse design collection", "High-quality materials", "Up to 10-year warranty", "Multiple customization options", "Competitive pricing"], process: ["Free consultation & needs assessment", "Design proposals & quotes", "Custom manufacturing", "Installation & support"], img: IMG.officeInt },
    "Workstations": { desc: "Modular and flexible workstations enabling multiple configurations for different teams. Designed to enhance collaboration and productivity while providing privacy and comfort.", features: ["Flexible modular design", "Soundproof partitions", "Smart cable management", "Individual lighting", "Expandable"], process: ["Space planning", "Configuration selection", "Manufacturing", "Professional installation"], img: IMG.glassOffice },
    "Executive Offices": { desc: "Premium furnishings for executives reflecting status and professionalism. We deliver complete solutions combining luxury and functionality.", features: ["Premium natural materials", "Exclusive designs", "Technology integration", "Hand-finishing", "Extended warranty"], process: ["Design consultation", "Exclusive design proposals", "Custom manufacturing", "Delivery & installation"], img: IMG.executive },
    "Meeting Rooms": { desc: "Complete solutions for boardrooms and meeting rooms combining functionality and aesthetics. We guarantee spaces that inspire creativity and collaboration.", features: ["Audio-visual systems", "Tech-integrated tables", "Multi-level lighting", "Sound insulation", "Flexible designs"], process: ["Needs analysis", "Room design", "System setup", "Commissioning"], img: IMG.conference },
    "Reception Areas": { desc: "Distinctive reception fronts that express your brand identity and leave lasting impressions. We design welcoming spaces combining elegance and practicality.", features: ["Bold innovative designs", "Distinctive lighting", "Brand integration", "Comfortable seating", "Premium materials"], process: ["Custom design", "Material selection", "Manufacturing", "Installation"], img: IMG.reception },
    "Healthcare Furniture": { desc: "Medical-grade furniture meeting the highest safety and quality standards for hospitals and clinics. We ensure compliance with health standards while maintaining aesthetics.", features: ["Antibacterial", "Easy to clean & sterilize", "Health standard compliant", "Patient comfort", "Durable & long-lasting"], process: ["Standards review", "Custom solution development", "Certified manufacturing", "Installation & warranty"], img: IMG.modernLobby },
  },
};

export function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="block w-8 h-px" style={{ background: GOLD }} />
      <span
        className="text-xs tracking-[0.25em] uppercase font-medium"
        style={{ color: light ? "rgba(192,154,79,0.9)" : GOLD, fontFamily: "'Manrope', sans-serif" }}
      >
        {text}
      </span>
    </div>
  );
}

export function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
