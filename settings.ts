import { App, PluginSettingTab, Setting, TextComponent } from 'obsidian';
import TextInsertionPlugin from './main';

interface Item {
    displayName: string;
    text: string;
}

export interface TextInsertionPluginSettings {
    items: Item[];
}

export const DEFAULT_SETTINGS: TextInsertionPluginSettings = {
    items: []
};

export class TextInsertionPluginSettingTab extends PluginSettingTab {
    plugin: TextInsertionPlugin;

    constructor(app: App, plugin: TextInsertionPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: 'Text Insert Settings' });

        new Setting(containerEl)
            .setName('Add Text')
            .addButton(button => button
                .setButtonText('Add')
                .onClick(() => {
                    this.plugin.settings.items.push({ displayName: '', text: '' });
                    this.plugin.saveSettings();
                    this.display();
                }));

        this.plugin.settings.items.forEach((item, index) => {
            new Setting(containerEl)
                .setName(`${index + 1}`)
                .addText(text => text
                    .setPlaceholder('Display Name')
                    .setValue(item.displayName)
                    .onChange(async (value) => {
                        item.displayName = value;
                        await this.plugin.saveSettings();
                    }))
                .addText(text => text
                    .setPlaceholder('Text to Insert')
                    .setValue(item.text)
                    .onChange(async (value) => {
                        item.text = value;
                        await this.plugin.saveSettings();
                    }))
                .addButton(button => button
                    .setButtonText('Delete')
                    .onClick(() => {
                        this.plugin.settings.items.splice(index, 1);
                        this.plugin.saveSettings();
                        this.display();
                    }));
        });
    }
}