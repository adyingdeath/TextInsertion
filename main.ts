import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { TextInsertionPluginSettings, DEFAULT_SETTINGS, TextInsertionPluginSettingTab } from './settings';

// Remember to rename these classes and interfaces!

export default class TextInsertionPlugin extends Plugin {
	settings: TextInsertionPluginSettings;

	async onload() {
		await this.loadSettings();

		this.registerCommands();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new TextInsertionPluginSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
		this.app.commands.removeCommand('my-plugin:command-id-1');
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	registerCommands() {
		
		this.app.commands.removeCommand('my-plugin:my-command');
		// 添加命令
		this.settings.items.forEach((item, index) => {
			this.addCommand({
				id: `insert-text-${index}`,
				name: item.displayName || `Insert ${item.text}`,
				editorCallback: (editor) => {
					editor.replaceSelection(item.text);
				}
			});
		});
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}