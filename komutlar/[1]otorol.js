const alescnm = require('discord.js');
const roldb = require('quick.db');
exports.run = async(client, message, args) => {
    if(!args[0]) return message.reply (" Komutu Yanlış Kullandınız.\n\n Komut Doğru Kullanım = \`.otorol yardım\`")
 
   if(args[0] == "ayarla" || args[0] == "aç") {
        if(args[1] == "kanal" ||args[1] == "channel") {

        var ales = message.mentions.channels.first() || message.guild.channel.cache.get(args[2]);

    if(!ales) return message.reply(' **Bir ``Kanal`` Belirtiniz.')

    roldb.set(`otorolkanali_${message.guild.id}`, ales.id)

    return message.reply(' **Otorol Kanalı Başarıyla Ayarlandı.**')}

    if(args[1] == "rol" || args[1] == "role") {

        var ronney = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
        if(!ronney) return message.reply(" **Bir ``Rol`` Belirtiniz.")
        roldb.set(`otorolrolu_${message.guild.id}`, ronney.id)
        return message.reply(' **Belirtilen Rol Başarıyla Ayarlandı.**')}}

    if(args[0] == "sıfırla" || args[0] == "kapat") {
        roldb.delete(`otorolkanali_${message.guild.id}`)
        roldb.delete(`otorolrolu_${message.guild.id}`)
        message.channel.send(' **Veritabanı ``Sıfırlandı``.\n**Otorol ``Kapatıldı``.')}

    if(args[0] == "yardım" || args[0] == "help") {
        const embedv3 = new alescnm.MessageEmbed()

        .setColor('#32353b')
        .setTitle('Otorol Sistemi')
        .setDescription(`

**=========**   \`Otorol Yardım\`**=========** 


 **=**  \`.otorol ayarla kanal\` : **Otorol Log Kanal Ayarlarsınız**
 **=**  \`.otorol ayarla rol\` :  **Otorol Rol'ü Ayarlarsınız.**
 **=**  \`.otorol sıfırla\` :  **Otorol Sıfırlarsınız**
`)
        message.channel.send(embedv3)
}
}

module.exports.conf = {

permLevel: 3,
aliases: []};
module.exports.help = {
name: "otorol"
}
