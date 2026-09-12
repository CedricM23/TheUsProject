
export default {
    getDates(){
        return dates;
    },

    getDateById(id){
         return dates.find((date) => date.id == id);
    },
    getDateBy(name){
        return dates.find((date) => date.name == name)
    }
    
}

const dates = [
    {
        id: 1,
        name: 'Moon Thai',
        location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.9448239270328!2d-80.22804948851044!3d26.682247076688412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d92f0f5a2af889%3A0xf6a9ffa6148838ec!2sMoon%20Thai%20%26%20Japanese!5e0!3m2!1sen!2sus!4v1748902194032!5m2!1sen!2sus',
        imageOfPlace: 'https://placehold.co/600x400/ffb6c1/ffffff?text=Moon+Thai',
        song: "https://embed.music.apple.com/us/album/when-we-were-friends/1517139758?i=1517139760",
        articleTitle: 'Our First Date',
        datetime: 'October 15th 2025',
        Description: [
            'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.',
            'Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            'Cras id est sit amet eros efficitur aliquam. Nullam in diam at mi rhoncus accumsan. Etiam dapibus, est sit amet pellentesque auctor, ante arcu finibus lectus, vitae sagittis ex ex elementum sem. Fusce vitae massa sit amet arcu aliquet scelerisque.'
        ],
        scrapbookImageCaption: 'Nervous smiles before the appetizers arrived!'
    },
    {
        id: 2,
        name: 'Starlight Drive-In Theater',
        location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.839611370211!2d-81.3853!3d28.5383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMyJzE3LjkiTiA4McKwMjMnMDcuMSJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus',
        imageOfPlace: 'https://placehold.co/600x400/2c3e50/ffffff?text=Drive-In+Movie',
        song: "https://embed.music.apple.com/us/album/drive/1440869641?i=1440869649",
        articleTitle: 'Movie Night Under the Stars',
        datetime: 'November 12th 2025',
        Description: [
            'Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.',
            'Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.'
        ],
        scrapbookImageCaption: 'Spilled popcorn everywhere, but totally worth it.'
    },
    {
        id: 3,
        name: 'Blue Planet Aquarium',
        location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.52928509375!2d-81.2000!3d28.4500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzAwLjAiTiA4McKwMTInMDAuMCJX!5e0!3m2!1sen!2sus!4v1630000000000!5m2!1sen!2sus',
        imageOfPlace: 'https://placehold.co/600x400/00bcd4/ffffff?text=Aquarium',
        song: "https://embed.music.apple.com/us/album/ocean-eyes/1440932977?i=1440933256",
        articleTitle: 'Lost in the Deep Blue',
        datetime: 'January 5th 2026',
        Description: [
            'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit.',
            'Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi. Nunc nulla. Suspendisse non nisl sit amet velit hendrerit rutrum. Ut leo. Omnis voluptas assumenda est, omnis dolor repellendus.',
            'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.'
        ],
        scrapbookImageCaption: 'Hypnotized by the jellyfish tank.'
    },
    {
        id: 4,
        name: 'Luigi\'s Italian Kitchen',
        location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.34002148201!2d-81.3000!3d28.6000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzAwLjAiTiA4McKwMTgnMDAuMCJX!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus',
        imageOfPlace: 'https://placehold.co/600x400/e74c3c/ffffff?text=Italian+Dinner',
        song: "https://embed.music.apple.com/us/album/thats-amore/1440807662?i=1440807954",
        articleTitle: 'Carbs and Conversation',
        datetime: 'February 14th 2026',
        Description: [
            'Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Aenean viverra rhoncus pede. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut non enim eleifend felis pretium feugiat.',
            'Vivamus quis mi. Phasellus a est. Phasellus magna. In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis in nunc fringilla tristique. Morbi mattis ullamcorper velit.',
            'Phasellus gravida semper nisi. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed hendrerit. Morbi ac felis.'
        ],
        scrapbookImageCaption: 'We ate so much pasta we couldn\'t walk.'
    },
     {
        id: 5,
        name: 'Moon Thai',
        location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.9448239270328!2d-80.22804948851044!3d26.682247076688412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d92f0f5a2af889%3A0xf6a9ffa6148838ec!2sMoon%20Thai%20%26%20Japanese!5e0!3m2!1sen!2sus!4v1748902194032!5m2!1sen!2sus',
        imageOfPlace: 'https://placehold.co/600x400/ffb6c1/ffffff?text=Moon+Thai',
        song: "https://embed.music.apple.com/us/album/when-we-were-friends/1517139758?i=1517139760",
        articleTitle: 'Our First Date',
        datetime: 'October 15th 2025',
        Description: [
            'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.',
            'Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            'Cras id est sit amet eros efficitur aliquam. Nullam in diam at mi rhoncus accumsan. Etiam dapibus, est sit amet pellentesque auctor, ante arcu finibus lectus, vitae sagittis ex ex elementum sem. Fusce vitae massa sit amet arcu aliquet scelerisque.'
        ],
        scrapbookImageCaption: 'Nervous smiles before the appetizers arrived!'
    }
]