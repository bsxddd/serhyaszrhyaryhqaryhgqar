const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms');//
const tags = require('common-tags');
const { config } = require('process');
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
    ${files.length} komut yüklenecek.
‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`[KOMUT] | ${props.help.name} Eklendi.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);

//------------------------------------------------------------------------------------------------------------\\
 client.config = {
  "sunucuid": "947107463046516796",

  "taglog": "947112924441346098",

  "chat":"947112924441346098",

  "seskanal": "947255223813013514",

  "taglırol": "",

  "tag" : "神",
  "tag2": "#0034",

"erkek1": "",
"erkek2": "",


"kız1": "",
"kız2": "",

"kayıtsız": "947112656052060241",

"teyitci": "",

"footer": "Allah",

"sunucuadı": "🏁🏁 #0034",

"toplantikanal": "",

"katıldırol": "",

"owner": "947112523004543047",

"yetkilirol1": "967791836280274975",



"yetkilialim": "947427257020985404",

"yetkili1": "947112515261857812",

"yetkili2": "947112621033807972",

"yetkili3": "947112569049595974",

"yetkilog": "947112997292216320",


  "banhammer": "947427257020985404",

  "jailhammer": "947427257020985404",

  "transport": "947427257020985404",

  "mutehammer": "955533366529232956",

  "vmutehammer": "955533366529232956",

  "commander": "967791836280274975",


  "banlog": "947112994385567754",

  "jaillog": "947112994385567754",

  "mutelog": "947112994385567754",

  "vmutelog": "947112994385567754",



  "onayemoji": "<a:nikee:955187830139809802>",
  "redemoji": "<a:brahman_nah:953571883222204417>",
  "sayı0": "0",
  "sayı1": "1",
  "sayı2": "2",
  "sayı3": "3",
  "sayı4": "4",
  "sayı5": "5",
  "sayı6": "6",
  "sayı7": "7",
  "sayı8": "8",
  "sayı9": "9",

 
  "booster": "947122952116265032",

  "jailrol": "955244543312285726",
 "şüphelihesap": "955244543312285726",

  "muterol": "947112776361472000",

  ///////////////ROLLER////////
  "vip": "947112636468830289",
  "ekip": "947137816545067008",

  "uyarı": "",
  "uyarılog": "",

"rollog": "947112997292216320"
  
 }
///////////////////////////////////////////////////////

client.on('messageDelete', message => {
    const data = require("quick.db")
    data.set(`snipe.mesaj.${message.guild.id}`, message.content)
    data.set(`snipe.id.${message.guild.id}`, message.author.id)

  })





// Main Dosyası 

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const taginlo = (client.config.tag)
  const inlosunucu = (client.config.sunucuid)
  const inlokanal = (client.config.taglog)
  const rolinlo = (client.config.taglırol)

  try {

  if (newUser.username.includes(taginlo) && !client.guilds.cache.get(inlosunucu).members.cache.get(newUser.id).roles.cache.has(rolinlo)) {
  await client.channels.cache.get(inlokanal).send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${newUser} ${taginlo} Tagımızı Aldığı İçin <@&${rolinlo}> Rolünü Verdim`));
  await client.guilds.cache.get(inlosunucu).members.cache.get(newUser.id).roles.add(rolinlo);
  }
  if (!newUser.username.includes(taginlo) && client.guilds.cache.get(inlosunucu).members.cache.get(newUser.id).roles.cache.has(rolinlo)) {
  await client.channels.cache.get(inlokanal).send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${newUser} ${taginlo} Tagımızı Çıkardığı İçin <@&${rolinlo}> Rolünüz Alındı`));
  await client.guilds.cache.get(inlosunucu).members.cache.get(newUser.id).roles.remove(rolinlo);
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});
    //------------------------------------------------------------------------------------------------------------\\


client.on("message" , async msg => {
  
    if(!msg.guild) return;
    if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
    
    let afk = msg.mentions.users.first()
    
    const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
    
    const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
   if(afk){
     const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
     const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
     if(msg.content.includes(kisi3)){
  
         msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`))
     }
   }
    if(msg.author.id === kisi){
  
         msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`)).then(x => x.delete({timeout: 5000}));
     db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
     db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
     db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
      msg.member.setNickname(isim)
      
    }
    
  });
  ///////////////////////////////////////////////////////
  //--------------------------------------------------------------------------------------\\

  client.on("message", message => {
    if(message.content.toLowerCase() == ".link") 
    return message.channel.send((client.config.tag))
});

client.on("message", message => {
  if(message.content.toLowerCase() == ".abone-ol") 
  return message.channel.send((client.config.tag))
});

////////////////////////////////////////////////////////////////

 client.on("guildMemberAdd", member => {
        require("moment-duration-format")
        if (member.guild.id !== "813457879394025482") return; 
          var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
          var üs = üyesayısı.match(/([0-9])/g)
          üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
          if(üs) {
            üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
              return {
                  '0': `822840379250442280`,
                  '1': `822840372610465843`,
                  '2': `822840375147888640`,
                  '3': `822840376049401856`,
                  '4': `822840376049401856`,
                  '5': `822840370508988436`,
                  '6': `822840370777948201`,
                  '7': `822840368969678848`,
                  '8': `822840373603860580`,
                  '9': `822840371741982720`}[d];})}
        const kanal = member.guild.channels.cache.find(r => r.id === "947112924441346098");
        let user = client.users.cache.get(member.id);
        require("moment-duration-format");
          const kurulus = new Date().getTime() - user.createdAt.getTime();  
         const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
        var kontrol;
      if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil '
      if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir Gözüküyor  '
        moment.locale("tr");
        kanal.send(`
      Sunucumuza Hoşgeldin <@`+ member + `>, sayende `+üyesayısı+ ` kişi olduk!`)});
      



  
////----------------------- iltifat-----------------------\\\\

const mavera = [ // iltifat
  
  'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
  'Mavi gözlerin, gökyüzü oldu dünyamın.',
  'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
  'Huzur kokuyor geçtiğin her yer.',
  'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
  'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
  'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
   'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
   'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
   'Etkili gülüş kavramını ben senden öğrendim.',
   'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
   'Gözlerinle baharı getirdin garip gönlüme.',
   'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek. ',
   'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
   'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
   'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
   'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
   'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
   'Aynı zaman diliminde yaşamak benim için büyük ödüldür. ',
  'Biraz Çevrendeki İnsanları Takarmısın ?',
  'İğrenç İnsansın!',
   'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
   'Onu Bunu Boşver de bize gel 2 bira içelim.',
    'Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.',
    'Mucizelerden bahsediyordum.',
      "Oha bu çocuk Türk müüüüüüüüüüüü?",
      "dur kıyafetlerimi çıkarayım, eşit şartlarda konuşalım",
      "gitsen tek kaybım mal kaybı olur hahaha ",
      "bunun adı kalp güzelim. Tersten okuduğun gibi plak değil ki sürekli sende takılı kalsın.",
      "kafamı yaşasan kafana sıkarsın",
      "sanırım seni getiren leyleğin bıraktığı izdi, kuş beyinli olman.",
      "senin için savaşırdım ama verimsiz toprakları feth etmeye gerek yok ",
      "birbirimizi çift görmem için kaç duble daha içmeliyim? ",
      "azrail bile ayağıma geliyor ne bu tripler? ",
      "Buralarda yeniyim de kalbinin yolunu tarif eder misin? ",
      "Nasıl yani şimdi sen gerçek misin?",
      "Bunca zaman neredeydin ?",
      "seni seviyorum.",
      "Allah seni yaratmış fakat takip etmiyor sanırım, bu tip ne?",
      "sarılalım mı?",
      "benimle evlenir misin?",
      "azıcık beynini kullan diyeceğim fakat seni zor durumda bırakmak istemiyorum.",
      "akıllara zarar bi mükemmelliğin var.",
      "attan indiysek leopar falan gelmiştir ben anlamam eşekten ",
      "dedikodu yapalım mı?",
      "iyi ki varsın 💕",
      "şu üstteki aptik ne anlatıyor ya?",
      "o kadar haklısın ki... seni öpesim var ",
      "öpşuelimi? çabuk!",
      "yavrum hepsi senin mi?",
      "bi alo de gelmezsem gençliğim solsun.",
      "çok şişkosun. ",
      "sevgilim var yazma?",
      "zenginsen evlenelim mi? ",
      "halk pazarı gibisin canım sana olan tek ilgim ucuzluğundan ",
      "o kadar çok meslek türü varken neden şerefsizlik tatlım? ",
      "bu güne aynayı öperek başladım",
      "çok bereketli topraklarımız yok mu? her türlü şerefsiz yetişiyor ",
      "taş gibisin!",
      "kalitesizliğinin kokusu geldi...",
      "Şey gözlerin çok güzelmiş tanışalım mı ?",
      "Kalbinin yolunu gösterir misin... ",
      "Corona olsan bile sana sarılırdım",
      "Oha sen gerçek misin ?",
      "kahveyi sütsüz seni tereddütsüz seviyorum ",
      "senin hava attığın yerde benim rüzgarım esiyor ",
      "çok güzel bi tablo gördüm tam alacaktım ama aynaymış... ",
      "canım haddin hariç her şeyi biliyorsun",
      "havalar alev gibii, tatile serin bi yerlere gitsene mesela morg?",
      "tavla oynayalım ama sen beni tavla",
      "hava sıcak değil aşkından yanıyorum ",
      "konum atta belamızı bulalım bebeğim ",
      "üşüdüysen sana abayı yakayım mı ",
      "gel biraz otur yanıma ölünce gidersin",
      "sütüm yarım yağlı mutluluğum sana bağlı ",
      "eğer ahtapot olsaydım üç kalbimi de sana verirdim ",
      "salağa yatarken uyuya falan mı kaldın?",
      "meleksin ama canımı alıyorsun yoksa Azrailim misin? ",
      "Selam kızsan Sphinxle sew olabilirsin şş :heart:",
      "ben varya fay hattı olsam kesin daha az kırılırdım ",
      "iban at hayallerimi yollayayım harcarsın ",
      "ankarada deniz sende karakter ",
      "sana hayatım diyorum çünkü o kadar kötüsün",
      "görüşelim mi? mahşer yeri uygun mu?",
      "eşekten yarış atı olmaz ama sen genede koş spor yaparsın",
      "Anlatsana biraz neden bu kadar mükemmelsin?",
      "Nasılsın diye sorma bebeğim, sana göreyim kıpss" ,
      "Kakaolu sütsün seni sevmeyen ölsün",
      "Ya sen hep böyle hoşuma mı gideceksin ? ",
      "Çikolatalı keksin bu alemde teksin ",
      "8 milyar gülüş varken seninki favorim",
      "dalin gibi kokuyorsun ",
      "seni her gün görenlerin şansından istiyorum ",
      "en iyisine layıksın yani bana hıh ",
      "ateşimin çıkma sebebi corona değil, sensin ",
      "yemeğimi yedim şimdi seni yeme vakti ",
      "beni biraz takar mısın?  ",
      "aklın başına gelir ama ben sana gelmem"
    ];
    
    client.on("message", async message => {
      if(message.channel.id !== ayarlar.chat) return;
      let maveraxd= db.get('chatiltifat');
      await db.add("chatiltifat", 1);
      if(maveraxd >= 100) {  
        db.delete("chatiltifat");
        const random = Math.floor(Math.random() * ((mavera ).length - 1) + 1);
        message.reply(`${(mavera )[random]}`)}});




///////////////////member remove 
client.on('guildMemberRemove' , member => {
  if(member.roles.cache.has((client.config.kayıtsız))) return;
if(member.roles.cache.has((client.config.kayıtsız1))) return;
  db.get(`isimler_${member.user.id}`);
  db.push(`isimler_${member.id}`, `\` ${member.displayName} \` (sunucudan ayrılma)`);
})



    //----------------------TAG-KONTROL----------------------\\     STG    

client.on("guildMemberAdd", member => {
  let sunucuid = (client.config.sunucuid); 
  let tag = (client.config.tag); 
  let rol = (client.config.taglırol); 
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> Adlı kişi sunucumuza taglı katıldı`)
      .setTimestamp()
     client.channels.cache.get((client.config.taglog)).send(tagalma)
}
})

client.on("guildMemberAdd", member => {
  member.roles.add((client.config.kayıtsız));
member.roles.add((client.config.kayıtsız1));

});